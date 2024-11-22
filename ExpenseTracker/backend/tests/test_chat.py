# backend/tests/test_chat.py

import os
import sys
import pytest
from unittest.mock import Mock, patch


# Add the backend directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from chat import create_prompt, gpt_prompt

# Mock API response for OpenAI
MOCK_API_RESPONSE = {
    "choices": [
        {
            "message": {
                "content": "This is a test response from ChatGPT."
            }
        }
    ]
}

# -------------------------------
# Option 1: Test `create_prompt()`
# -------------------------------

def test_create_prompt_valid_input():
    """
    Test that create_prompt() correctly formats a valid input string.
    """
    prompt = "Hello, world!"
    result = create_prompt(prompt)

    # Assert the result has the expected keys
    assert "model" in result, "Payload should include 'model' key"
    assert "messages" in result, "Payload should include 'messages' key"

    # Assert the model is set correctly
    assert result["model"] == "gpt-3.5-turbo" 

    # Assert the message is formatted correctly
    assert isinstance(result["messages"], list), "Messages should be a list"
    assert result["messages"][0]["role"] == "user", "Role should be 'user'"
    assert result["messages"][0]["content"] == prompt, "Content should match the input prompt"

def test_create_prompt_empty_input():
    """
    Test that create_prompt() handles an empty string input.
    """
    prompt = ""
    result = create_prompt(prompt)

    # Assert the payload still conforms to the expected structure
    assert result["messages"][0]["content"] == "", "Content should be an empty string"

def test_create_prompt_invalid_type():
    """
    Test that create_prompt() handles non-string inputs gracefully.
    """
    invalid_inputs = [None, 123, 45.6, ['list'], {'dict': 'value'}]
    for invalid_input in invalid_inputs:
        result = create_prompt(invalid_input)
        assert isinstance(result, dict), "The result should always be a dictionary."
        assert 'messages' in result, "Payload should contain 'messages' key."


# -------------------------------
# Option 2: Test `gpt_prompt()`
# -------------------------------

@patch("chat.client.chat.completions.create")
def test_gpt_prompt_success(mock_create):
    """
    Test that gpt_prompt() handles a successful API response.
    """
    # Create a mock message object
    mock_message = Mock()
    mock_message.content = "This is a test response from ChatGPT."

    # Create a mock choice object containing the mock message
    mock_choice = Mock()
    mock_choice.message = mock_message

    # Create a mock response object containing the mock choice
    mock_response = Mock()
    mock_response.choices = [mock_choice]

    # Set the mock to return our mock response
    mock_create.return_value = mock_response

    # Create a valid payload
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "Hello, world!"}]
    }

    # Call gpt_prompt() and check the result
    result = gpt_prompt(payload)
    assert result == "This is a test response from ChatGPT.", "gpt_prompt did not return the expected reply."
    

def test_gpt_prompt_empty_payload():
    """
    Test that gpt_prompt() handles an empty payload gracefully.
    """
    payload = {}
    result = gpt_prompt(payload)

    # Assert the fallback error message is returned
    assert result == "Something went wrong.", "Function should return fallback message for empty payload"

@patch("chat.client.chat.completions.create", side_effect=Exception("API error"))
def test_gpt_prompt_exception_handling(mock_create):
    """
    Test that gpt_prompt() handles exceptions gracefully.
    """
    payload = {
        "model": "your-model-name",
        "messages": [{"role": "user", "content": "Test message"}]
    }

    # Call gpt_prompt() and ensure it handles the exception
    result = gpt_prompt(payload)
    assert result == "Something went wrong.", "Function should return fallback message for exceptions"

# -------------------------------
# Option 3: Mock OpenAI API Interactions
# -------------------------------

@patch("chat.client.chat.completions.create")
def test_gpt_prompt_correct_api_call(mock_create):
    """
    Test that gpt_prompt() makes the correct API call with the expected parameters.
    """
    # Mock API response
    mock_create.return_value = MOCK_API_RESPONSE

    # Create a payload
    payload = {
        "model": "your-model-name",
        "messages": [{"role": "user", "content": "Check API call correctness"}]
    }

    # Call gpt_prompt()
    gpt_prompt(payload)

    # Verify that the API call was made with the correct parameters
    mock_create.assert_called_once_with(
        model="your-model-name",
        messages=[{"role": "user", "content": "Check API call correctness"}]
    )
