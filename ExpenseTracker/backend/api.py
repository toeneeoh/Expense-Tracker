"""Narrow API for the anonymous portfolio demo."""

import json
import os
import time
import uuid
from collections import defaultdict, deque
from datetime import date
from flask import Blueprint, jsonify, request
from database import execute, fetchall, fetchone, utc_now

api = Blueprint("api", __name__, url_prefix="/api")
RATE_LIMITS = defaultdict(deque)
CATEGORIES = {
    "income": {"Salary", "Freelance", "Interest", "Other income"},
    "expense": {"Housing", "Food", "Transport", "Utilities", "Subscriptions", "Shopping", "Wellness", "Other"},
}
SEED = [
    ("income", "Salary", "Monthly paycheck", 5200, 2), ("income", "Freelance", "Design project", 650, 8),
    ("expense", "Housing", "Rent", 1850, 3), ("expense", "Food", "Groceries", 420, 6),
    ("expense", "Transport", "Transit and rides", 185, 10), ("expense", "Utilities", "Utilities", 210, 12),
    ("expense", "Subscriptions", "Digital subscriptions", 96, 14), ("expense", "Shopping", "Household purchases", 260, 17),
    ("expense", "Wellness", "Gym membership", 75, 20),
]


def error(code, message, status):
    return jsonify({"error": {"code": code, "message": message}}), status


def valid_id(value):
    try:
        uuid.UUID(value)
        return True
    except (ValueError, TypeError, AttributeError):
        return False


def session_or_error(session_id):
    if not valid_id(session_id):
        return None, error("invalid_id", "The demo session ID is invalid.", 400)
    session = fetchone("SELECT * FROM demo_sessions WHERE id = ?", (session_id,))
    if not session:
        return None, error("session_not_found", "This demo session has expired. Start a new one to continue.", 404)
    return session, None


def seed_session(session_id):
    execute("DELETE FROM transactions WHERE session_id = ?", (session_id,))
    today = date.today()
    for kind, category, description, amount, day in SEED:
        execute(
            "INSERT INTO transactions (id, session_id, type, category, description, amount, occurred_on) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (str(uuid.uuid4()), session_id, kind, category, description, amount, today.replace(day=min(day, 28)).isoformat()),
        )
    execute("UPDATE demo_sessions SET savings_goal = ?, current_savings = ?, updated_at = ? WHERE id = ?", (5000, 2850, utc_now(), session_id))


def make_dashboard(session_id):
    session = fetchone("SELECT * FROM demo_sessions WHERE id = ?", (session_id,))
    rows = fetchall("SELECT * FROM transactions WHERE session_id = ? ORDER BY occurred_on DESC, id DESC", (session_id,))
    income = expenses = 0.0
    category_totals = defaultdict(float)
    transactions = []
    for row in rows:
        amount = float(row["amount"])
        transactions.append({**row, "amount": amount})
        if row["type"] == "income":
            income += amount
        else:
            expenses += amount
            category_totals[row["category"]] += amount
    target, current = float(session["savings_goal"]), float(session["current_savings"])
    return {
        "sessionId": session_id,
        "summary": {"income": income, "expenses": expenses, "balance": income - expenses, "savingsRate": round((income - expenses) / income * 100, 1) if income else 0},
        "goal": {"target": target, "current": current, "progress": min(round(current / target * 100, 1), 100) if target else 0},
        "categories": [{"name": key, "amount": value} for key, value in sorted(category_totals.items(), key=lambda item: item[1], reverse=True)],
        "transactions": transactions,
    }


def rule_insights(data):
    summary, categories = data["summary"], data["categories"]
    income, expenses, balance = summary["income"], summary["expenses"], summary["balance"]
    if income == 0:
        first = {"title": "Add your income", "observation": "There is no income recorded this month.", "action": "Add regular take-home income to make the analysis meaningful.", "impact": "Unlock an accurate monthly plan.", "priority": "high"}
    elif balance < 0:
        first = {"title": "Close the monthly gap", "observation": f"Spending is ${abs(balance):,.0f} above income.", "action": "Pause flexible purchases and review the largest category first.", "impact": f"Recover ${abs(balance):,.0f} to break even.", "priority": "high"}
    elif summary["savingsRate"] < 20:
        extra = max(income * .2 - balance, 0)
        first = {"title": "Build a 20% savings rhythm", "observation": f"Your savings rate is {summary['savingsRate']:.0f}%.", "action": "Schedule a transfer just after payday.", "impact": f"Redirect about ${extra:,.0f} more this month.", "priority": "high"}
    else:
        first = {"title": "Protect your strong surplus", "observation": f"You are keeping {summary['savingsRate']:.0f}% of recorded income.", "action": "Automate part of the surplus toward your savings goal.", "impact": f"Up to ${balance:,.0f} can support future goals.", "priority": "medium"}
    if categories and expenses:
        largest, share = categories[0], categories[0]["amount"] / expenses * 100
        second = {"title": f"Review {largest['name'].lower()} spending", "observation": f"{largest['name']} is {share:.0f}% of expenses.", "action": "Review these charges and choose one realistic reduction.", "impact": f"A 10% reduction frees about ${largest['amount'] * .1:,.0f} monthly.", "priority": "medium"}
    else:
        second = {"title": "Create a spending baseline", "observation": "There are not enough expenses to identify a pattern.", "action": "Add a week of expenses across usual categories.", "impact": "Reveal where small changes matter most.", "priority": "medium"}
    remaining = max(data["goal"]["target"] - data["goal"]["current"], 0)
    months = max(round(remaining / max(balance, 1)), 1) if remaining else 0
    third = {"title": "Keep the goal visible", "observation": f"Your savings goal is {data['goal']['progress']:.0f}% funded.", "action": "Review progress monthly and adjust when priorities change.", "impact": "Goal reached" if not remaining else f"The remaining ${remaining:,.0f} could take about {months} months.", "priority": "low"}
    return [first, second, third]


def enhance(insights, data):
    if not os.getenv("OPENAI_API_KEY"):
        return insights, False
    try:
        from openai import OpenAI
        client = OpenAI(api_key=os.environ["OPENAI_API_KEY"], timeout=8)
        response = client.responses.create(
            model=os.getenv("OPENAI_MODEL", "gpt-4.1-mini"),
            input="Rewrite these conservative educational budgeting insights. Return JSON with an insights array preserving all five keys and exactly three items: " + json.dumps({"insights": insights, "summary": data["summary"]}),
        )
        value = json.loads(response.output_text).get("insights")
        required = {"title", "observation", "action", "impact", "priority"}
        if isinstance(value, list) and len(value) == 3 and all(required <= item.keys() for item in value):
            return value, True
    except Exception:
        pass
    return insights, False


@api.get("/health")
def health():
    return jsonify({"status": "ok", "aiConfigured": bool(os.getenv("OPENAI_API_KEY")), "storage": "disposable" if os.getenv("DISPOSABLE_DEMO", "false").lower() == "true" else "persistent"})


@api.post("/demo-sessions")
def create_session():
    session_id, now = str(uuid.uuid4()), utc_now()
    execute("INSERT INTO demo_sessions (id, created_at, updated_at, savings_goal, current_savings) VALUES (?, ?, ?, ?, ?)", (session_id, now, now, 5000, 2850))
    seed_session(session_id)
    return jsonify(make_dashboard(session_id)), 201


@api.get("/demo-sessions/<session_id>/dashboard")
def dashboard(session_id):
    _session, failure = session_or_error(session_id)
    return failure or jsonify(make_dashboard(session_id))


@api.post("/demo-sessions/<session_id>/transactions")
def add_transaction(session_id):
    _session, failure = session_or_error(session_id)
    if failure:
        return failure
    body = request.get_json(silent=True) or {}
    kind, category, description = body.get("type"), str(body.get("category", "")).strip(), str(body.get("description", "")).strip()
    try:
        amount = round(float(body.get("amount")), 2)
    except (TypeError, ValueError):
        amount = 0
    occurred_on = str(body.get("occurredOn", ""))
    if kind not in CATEGORIES:
        return error("invalid_type", "Type must be income or expense.", 400)
    if category not in CATEGORIES[kind]:
        return error("invalid_category", "Choose a valid category.", 400)
    if not description or len(description) > 80:
        return error("invalid_description", "Description is required and must be 80 characters or fewer.", 400)
    if amount <= 0 or amount > 1_000_000:
        return error("invalid_amount", "Amount must be between 0 and 1,000,000.", 400)
    try:
        date.fromisoformat(occurred_on)
    except ValueError:
        return error("invalid_date", "Use a valid ISO date.", 400)
    execute("INSERT INTO transactions (id, session_id, type, category, description, amount, occurred_on) VALUES (?, ?, ?, ?, ?, ?, ?)", (str(uuid.uuid4()), session_id, kind, category, description, amount, occurred_on))
    return jsonify(make_dashboard(session_id)), 201


@api.delete("/demo-sessions/<session_id>/transactions/<transaction_id>")
def delete_transaction(session_id, transaction_id):
    _session, failure = session_or_error(session_id)
    if failure:
        return failure
    if not valid_id(transaction_id):
        return error("invalid_id", "The transaction ID is invalid.", 400)
    if not execute("DELETE FROM transactions WHERE id = ? AND session_id = ?", (transaction_id, session_id)):
        return error("transaction_not_found", "That transaction was not found.", 404)
    return jsonify(make_dashboard(session_id))


@api.put("/demo-sessions/<session_id>/goal")
def update_goal(session_id):
    _session, failure = session_or_error(session_id)
    if failure:
        return failure
    try:
        target = round(float((request.get_json(silent=True) or {}).get("target")), 2)
    except (TypeError, ValueError):
        target = 0
    if target < 100 or target > 1_000_000:
        return error("invalid_goal", "Savings goal must be between 100 and 1,000,000.", 400)
    execute("UPDATE demo_sessions SET savings_goal = ?, updated_at = ? WHERE id = ?", (target, utc_now(), session_id))
    return jsonify(make_dashboard(session_id))


@api.post("/demo-sessions/<session_id>/reset")
def reset(session_id):
    _session, failure = session_or_error(session_id)
    if failure:
        return failure
    seed_session(session_id)
    return jsonify(make_dashboard(session_id))


@api.post("/demo-sessions/<session_id>/insights")
def insights(session_id):
    _session, failure = session_or_error(session_id)
    if failure:
        return failure
    now, calls = time.time(), RATE_LIMITS[session_id]
    while calls and now - calls[0] > 60:
        calls.popleft()
    if len(calls) >= 5:
        return error("rate_limited", "Please wait before refreshing insights again.", 429)
    calls.append(now)
    data = make_dashboard(session_id)
    values, ai_used = enhance(rule_insights(data), data)
    return jsonify({"insights": values, "source": "ai" if ai_used else "rules", "disclaimer": "Educational guidance only — not professional financial advice."})
