# backend/tests/test_routes.py

import os
import sys
import pytest
from unittest.mock import patch

# Add the parent directory (backend) to sys.path to allow importing main.py and other backend modules.
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the Flask app instance from main.py
from main import app

# Fixture to create a test client for our Flask app
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

# Test for the /text/prompt route
def test_text_prompt_route(client):
    """
    Test the /text/prompt route.
    - Sends a POST request with a JSON payload containing some text.
    - Verifies that the response status code is 200.
    - Checks if the response contains the expected key 'processed_text'.
    """
    response = client.post('/text/prompt', json={"text": "Hello, world!"})
    assert response.status_code == 200, "Expected status code 200 for valid POST request"
    assert "processed_text" in response.get_json(), "Response should contain 'processed_text' key"

# Test for the /database/get route
def test_get_from_database_route(client):
    """
    Test the /database/get route.
    - Sends a POST request to fetch all user data.
    - Verifies that the response status code is 200.
    - Ensures the response JSON contains the 'all' key.
    - Verifies that the returned user data matches the expected values.
    """
    response = client.post('/database/get', json={
        "item": "all",  # Indicates that all user data should be fetched
        "username": "test",
        "table": "users"
    })
    assert response.status_code == 200, "Expected status code 200 for valid POST request"
    data = response.get_json()
    assert data is not None, "Response should not be None"
    assert 'all' in data, "Response JSON does not contain 'all' key"

    user_data = data['all']
    # Verify specific fields in the returned user data
    assert user_data['username'] == 'test', "Username does not match expected value"
    assert user_data['user_email'] == 'johndoe@gmail.com', "User email does not match expected value"
    assert user_data['job_title'] == 'developer', "Job title does not match expected value"
    assert user_data['password'] == '1234', "Password does not match expected value"

# Test to verify that all expected routes are registered
def test_registered_routes():
    """
    Test to check if all expected routes are registered in the app.
    - Uses app.url_map to get all registered routes.
    - Compares them against a list of expected routes.
    """
    # Retrieve all routes registered in the app
    routes = [rule.rule for rule in app.url_map.iter_rules()]
    
    # Define the list of expected routes
    expected_routes = [
        '/text/prompt',
        '/database/get',
        '/database/push',
        '/database/login',
        '/recommendations/update',
        # Add other routes as needed
    ]
    
    # Ensure each expected route is registered in the app
    for route in expected_routes:
        assert route in routes, f"Route '{route}' is not registered"
