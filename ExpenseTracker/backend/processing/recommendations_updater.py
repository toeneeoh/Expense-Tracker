from flask import Blueprint, request, jsonify
from database.postgres import get_item, push_item
from chat import create_prompt, gpt_prompt
import json
from decimal import Decimal

bp = Blueprint('recommendations', __name__, url_prefix='/recommendations')

def serialize_decimal(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError(f"Object of type {type(obj).__name__} is not JSON serializable.")

@bp.route('/generate', methods=['POST'])
def generate_recommendations():
    data = request.get_json()
    username = data.get('username')

    try:
        # Fetch data
        user_data = (get_item(item="all", username=username, table="users") or [{}])[0]
        incomes = get_item(item="all", username=username, table="incomes") or []
        expenses = get_item(item="all", username=username, table="expenses") or []
        debts = get_item(item="all", username=username, table="debts") or []
        monthly_incomes = get_item(item="all", username=username, table="monthly_total_incomes") or []
        monthly_expenses = get_item(item="all", username=username, table="monthly_total_expenses") or []

        # Convert all data into JSON-serializable formats
        user_data = json.loads(json.dumps(user_data, default=serialize_decimal))
        incomes = json.loads(json.dumps(incomes, default=serialize_decimal))
        expenses = json.loads(json.dumps(expenses, default=serialize_decimal))
        debts = json.loads(json.dumps(debts, default=serialize_decimal))
        monthly_incomes = json.loads(json.dumps(monthly_incomes, default=serialize_decimal))
        monthly_expenses = json.loads(json.dumps(monthly_expenses, default=serialize_decimal))

        # Prepare the data summary for GPT
        data_summary = {
            "user_info": {
                "city": f"{user_data.get('city_name', 'N/A')}, {user_data.get('state_name', 'N/A')}",
                "job_title": user_data.get("job_title", "N/A"),
                "weekly_hours": user_data.get("weekly_hours", 0),
                "hourly_wage": user_data.get("hourly_wage", 0),
                "goal": user_data.get("user_goal", "N/A"),
                "roommates": user_data.get("roommates_num", 0),
                "dependents": user_data.get("dependents_num", 0),
                "savings": user_data.get("savings", 0.0),
                "savings_increase": user_data.get("savings_increase", 0.0),
                "investments": user_data.get("investments", 0.0),
            },
            "incomes": incomes,
            "expenses": expenses,
            "debts": debts,
            "monthly_incomes": monthly_incomes,
            "monthly_expenses": monthly_expenses,
            "financial_overview": {
                "total_income": sum([income.get("income_amount", 0.0) for income in incomes]),
                "total_expenses": sum([expense.get("expense_amount", 0.0) for expense in expenses]),
            },
        }

        prompt = f"""
            You are a financial advisor tasked with improving a user's financial health. 
            Based on the provided data, generate three specific financial recommendations. 
            Each recommendation should include a title and a concise description.

            User Data:
            {json.dumps(data_summary, indent=2)}
        """
        
        # Create the GPT payload and get recommendations
        payload = create_prompt(prompt)
        gpt_response = gpt_prompt(payload)

        # Parse GPT output into structured recommendations
        recommendations = gpt_response.split("\n\n")
        structured_recommendations = []

        for rec in recommendations:
            if "Description:" in rec:
                try:
                    # Split into title and description
                    parts = rec.split("Description:")
                    title = parts[0].strip()  # Extract the title
                    description = parts[1].strip()  # Extract the description
                    structured_recommendations.append({
                        "title": title,
                        "description": description
                    })
                except IndexError:
                    # Fallback for improperly formatted recommendations
                    structured_recommendations.append({
                        "title": "Unknown Recommendation",
                        "description": rec.strip()
                    })
            else:
                # Handle cases where the format doesn't match
                structured_recommendations.append({
                    "title": "Unknown Recommendation",
                    "description": rec.strip()
                })

        # Store recommendations in the users table
        push_item("rec1_title", structured_recommendations[0]["title"] if len(structured_recommendations) > 0 else None, username, "users")
        push_item("rec1_desc", structured_recommendations[0]["description"] if len(structured_recommendations) > 0 else None, username, "users")
        push_item("rec2_title", structured_recommendations[1]["title"] if len(structured_recommendations) > 1 else None, username, "users")
        push_item("rec2_desc", structured_recommendations[1]["description"] if len(structured_recommendations) > 1 else None, username, "users")
        push_item("rec3_title", structured_recommendations[2]["title"] if len(structured_recommendations) > 2 else None, username, "users")
        push_item("rec3_desc", structured_recommendations[2]["description"] if len(structured_recommendations) > 2 else None, username, "users")

        return jsonify({
            "message": "Recommendations generated and updated successfully.",
            "recommendations": structured_recommendations
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/get', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    username = data.get("username")

    try:
        user_data = get_item(item="all", username=username, table="users")[0]
        recommendations = [
            {"title": user_data.get("rec1_title", "N/A"), "description": user_data.get("rec1_desc", "No description available.")},
            {"title": user_data.get("rec2_title", "N/A"), "description": user_data.get("rec2_desc", "No description available.")},
            {"title": user_data.get("rec3_title", "N/A"), "description": user_data.get("rec3_desc", "No description available.")},
        ]

        recommendations = [rec for rec in recommendations if rec["title"] != "N/A"]

        if recommendations:
            return jsonify({"recommendations": recommendations}), 200
        return jsonify({"message": "No recommendations found."}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
