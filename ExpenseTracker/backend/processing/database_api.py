from flask import Blueprint, request, jsonify
from database.postgres import get_item, push_item, get_user_data, insert_row

bp = Blueprint('database', __name__, url_prefix='/database')

@bp.route('/get', methods=['POST', 'OPTIONS'])
def get_from_database():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    item = data.get('item')
    username = data.get('username')
    table = data.get('table')

    if not item:
        return jsonify({"error": "No item found"}), 400

    try:
        if item == "all":
            item_value = get_user_data(username) # Returns a dict
        else:
            item_value = get_item(item, username, table) # Returns a string (?)
        item_value = get_item(item, username, table) # Returns a string or dict

        item_value = get_item(item, username, table) # Returns a string or dict

        if item_value is not None:
            return jsonify({item: item_value})
        else:
            return jsonify({"error": f"No data found for item '{item}' and username '{username}' from table '{table}'"}), 404
    except Exception as error:
        return jsonify({"error": str(error)}), 500

@bp.route('/push', methods=['POST', 'OPTIONS'])
def push_to_database():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    item = data.get('item')
    value = data.get('value')
    username = data.get('username')
    table = data.get('table')

    try:
        item_value = push_item(item, value, username, table)
        return jsonify({"message": item_value}), 200
    except Exception as error:
        return jsonify({"error": str(error)}), 500

@bp.route('/insert_row', methods=['POST', 'OPTIONS'])
def insert_row_db():
    if request.method == 'OPTIONS':
        return '', 200

    try:
        data = request.get_json()
        table = data.get('table')
        row_data = data.get('data')  # `data` contains column-value pairs for the new row

        if not table or not row_data:
            return jsonify({"error": "Missing required fields 'table' or 'data'"}), 400

        new_id = insert_row(row_data, table)  # This should insert the row and return the new ID

        if new_id is not None:
            return jsonify({"message": f"Row inserted into {table} with ID: {new_id}", "id": new_id}), 201
        else:
            return jsonify({"error": "Failed to insert the row."}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    stored_password = get_item("password", username)
    if stored_password and stored_password == password:
        return jsonify({"authenticated": True, "message": "Login successful."}), 200
    return jsonify({"authenticated": False, "message": "Invalid username or password."}), 401
    