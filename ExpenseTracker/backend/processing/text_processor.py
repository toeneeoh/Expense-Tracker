from flask import Blueprint, request, jsonify

bp = Blueprint('text', __name__, url_prefix='/text')

@bp.route('/process', methods=['POST'])
def process_text():
    data = request.get_json()
    text = data.get('text', '')
    processed = text.upper()
    return jsonify({"processed_text": processed})
