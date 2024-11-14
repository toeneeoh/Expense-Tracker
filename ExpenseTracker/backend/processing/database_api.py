from flask import Blueprint, request, jsonify
from database.postgres import get_item, push_item

bp = Blueprint('database', __name__, url_prefix='/database')

@bp.route('/get', methods=['POST', 'OPTIONS'])
def get_from_database():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    item = data.get('item')
    username = data.get('username')

    if not item:
        return jsonify({"error": "No item found"}), 400

    try:
        # Call get_item to retrieve the requested data
        item_value = get_item(item, username)
        if item_value is not None:
            return jsonify({item: item_value})
        else:
            return jsonify({"error": f"No data found for item '{item}' and username '{username}'"}), 404
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

    try:
        item_value = push_item(item, value, username)
        return jsonify({"message": item_value}), 200
    except Exception as error:
        return jsonify({"error": str(error)}), 500

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
    