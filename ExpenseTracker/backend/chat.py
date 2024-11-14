import openai
from config import OPENAI_API_KEY, MODEL

client = openai.OpenAI(api_key=OPENAI_API_KEY)

def create_prompt(prompt: str) -> dict:
    """Takes a message and generates the appropriate query format for a ChatGPT request"""
    # The prompt should be wrapped as a list of dictionaries for each message
    messages = [{"role": "user", "content": prompt}]
    
    payload = {
        'model': MODEL,
        'messages': messages,
    }
    return payload

def gpt_prompt(payload: dict) -> str:
    """Attempts to query OpenAI via a dict"""
    reply = "Something went wrong."
    try:
        # Use the client to create a chat completion
        response = client.chat.completions.create(**payload)
        # Extract the response content
        reply = response.choices[0].message.content
    except Exception as e: 
        print(f"Unexpected Error: {e}")

    return reply
