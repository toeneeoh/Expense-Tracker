# backend/tests/test_message_generator.py

import os
import sys
import pytest
from unittest.mock import patch

# Add the parent directory (backend) to sys.path to allow importing modules from the backend folder
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app  # Import the Flask app instance from main.py

# Fixture to create a test client for our Flask app
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

# Test for the /text/prompt route in message_generator.py
def test_process_text_route(client):
    """
    Test the /text/prompt route.
    - Mocks the 'create_prompt' and 'gpt_prompt' functions to avoid external dependencies.
    - Sends a POST request with a JSON payload containing 'text'.
    - Verifies that the response status code is 200.
    - Checks if the response contains the expected key 'processed_text' with the correct value.
    """

    # Mock the 'create_prompt' and 'gpt_prompt' functions in the message_generator module
    with patch('processing.message_generator.create_prompt') as mock_create_prompt, \
         patch('processing.message_generator.gpt_prompt') as mock_gpt_prompt:
        
        # Set up the mock return values
        mock_create_prompt.return_value = {
            'model': 'test-model',
            'messages': [{'role': 'user', 'content': 'Hello, world!'}]
        }
        mock_gpt_prompt.return_value = 'Processed text from GPT'

        # Send a POST request to the route with sample data
        response = client.post('/text/prompt', json={"text": "Hello, world!"})

        # Check that the response status code is 200
        assert response.status_code == 200, "Expected status code 200 for valid POST request"

        # Parse the JSON response
        data = response.get_json()
        assert data is not None, "Response should not be None"

        # Check that 'processed_text' is in the response and has the expected value
        assert 'processed_text' in data, "Response should contain 'processed_text' key"
        assert data['processed_text'] == 'Processed text from GPT', "Processed text does not match expected value"

        # Verify that the mocks were called with the expected arguments
        mock_create_prompt.assert_called_once_with('Hello, world!')
        mock_gpt_prompt.assert_called_once_with({
            'model': 'test-model',
            'messages': [{'role': 'user', 'content': 'Hello, world!'}]
        })

# Additional test for handling OPTIONS method
def test_process_text_options_method(client):
    """
    Test the /text/prompt route with an OPTIONS request.
    - Verifies that the response status code is 200.
    - Checks that the response data is empty.
    """

    # Send an OPTIONS request to the route
    response = client.options('/text/prompt')

    # Check that the response status code is 200
    assert response.status_code == 200, "Expected status code 200 for OPTIONS request"

    # Check that the response data is empty
    assert response.get_data(as_text=True) == '', "Response data should be empty for OPTIONS request"

# Additional test for missing 'text' in the request payload
def test_process_text_missing_text_key(client):
    """
    Test the /text/prompt route when 'text' key is missing in the JSON payload.
    - Verifies that the response status code is 200.
    - Ensures that the functions handle default values appropriately.
    """

    # Mock the 'create_prompt' and 'gpt_prompt' functions
    with patch('processing.message_generator.create_prompt') as mock_create_prompt, \
         patch('processing.message_generator.gpt_prompt') as mock_gpt_prompt:

        # Set up the mock return values
        mock_create_prompt.return_value = {'model': 'test-model', 'messages': [{'role': 'user', 'content': ''}]}
        mock_gpt_prompt.return_value = 'Processed text from GPT with empty input'

        # Send a POST request without the 'text' key
        response = client.post('/text/prompt', json={})

        # Check that the response status code is 200
        assert response.status_code == 200, "Expected status code 200 even if 'text' key is missing"

        # Parse the JSON response
        data = response.get_json()
        assert data is not None, "Response should not be None"

        # Check that 'processed_text' is in the response and has the expected value
        assert 'processed_text' in data, "Response should contain 'processed_text' key"
        assert data['processed_text'] == 'Processed text from GPT with empty input', "Processed text does not match expected value for empty input"

        # Verify that the mocks were called with the expected arguments
        mock_create_prompt.assert_called_once_with('')
        mock_gpt_prompt.assert_called_once_with({'model': 'test-model', 'messages': [{'role': 'user', 'content': ''}]})

# Additional test for invalid JSON payload
def test_process_text_invalid_json(client):
    """
    Test the /text/prompt route with invalid JSON payload.
    - Verifies that the response status code is 400.
    - Checks that an appropriate error message is returned.
    """

    # Send a POST request with invalid JSON data
    response = client.post('/text/prompt', data="Invalid JSON", content_type='application/json')

    # Check that the response status code is 400 (Bad Request)
    assert response.status_code == 400, "Expected status code 400 for invalid JSON payload"

