from flask import Blueprint, request, jsonify

bp = Blueprint('text', __name__, url_prefix='/text')

@bp.route('/process', methods=['POST', 'OPTIONS'])
def process_text():
    if request.method == 'OPTIONS':
            return '', 200  # Respond to preflight request

    data = request.get_json()
    text = data.get('text', '')
    processed = text.upper()
    return jsonify({"processed_text": processed})
