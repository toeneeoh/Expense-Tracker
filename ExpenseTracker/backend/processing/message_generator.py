from flask import Blueprint, request, jsonify
from chat import gpt_prompt, create_prompt

bp = Blueprint('text', __name__, url_prefix='/text')

@bp.route('/prompt', methods=['POST', 'OPTIONS'])
def process_text():
    if request.method == 'OPTIONS':
            return '', 200  # Respond to preflight request

    data = request.get_json()
    text = data.get('text', '')
    json = create_prompt(text)
    processed = gpt_prompt(json)
    return jsonify({"processed_text": processed})

# generate ChatGPT message by feeding ChatGPT one of a few randomly generated templates
# chatGPT gives daily advice based on top 3 recommendations made
# i.e. if top recommendation is "decrease takeout expenses", return ChatGPT's output for "Give me a quick tip about decreasing takeout expenses"
# optional button to ask for another tip, which just prompts chatGPT with "give me another tip"