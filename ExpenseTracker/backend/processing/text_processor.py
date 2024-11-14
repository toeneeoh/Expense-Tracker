from flask import Blueprint, request, jsonify
from chat import gpt_prompt, create_prompt

bp = Blueprint('text', __name__, url_prefix='/text')

@bp.route('/process', methods=['POST', 'OPTIONS'])
def process_text():
    if request.method == 'OPTIONS':
            return '', 200  # Respond to preflight request

    data = request.get_json()
    text = data.get('text', '')
    json = create_prompt(text)
    processed = gpt_prompt(json)
    return jsonify({"processed_text": processed})
