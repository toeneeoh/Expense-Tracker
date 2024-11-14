from flask import Blueprint, request, jsonify

# generate ChatGPT message by feeding ChatGPT one of a few randomly generated templates
# chatGPT gives daily advice based on top 3 recommendations made
# i.e. if top recommendation is "decrease takeout expenses", return ChatGPT's output for "Give me a quick tip about decreasing takeout expenses"
# optional button to ask for another tip, which just prompts chatGPT with "give me another tip"