from flask import Blueprint, request, jsonify
from database.postgres import get_item

bp = Blueprint('database', __name__, url_prefix='/database')

@bp.route('/get', methods=['POST', 'OPTIONS'])
def get_from_database():
    if request.method == 'OPTIONS':
            return '', 200

    data = request.get_json()
    item = data.get('item')
    username = data.get('username', 'test')  # Default to "test" if username is not provided

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
