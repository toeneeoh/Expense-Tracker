# backend/tests/test_database_api.py

import os
import sys
import pytest
from unittest.mock import patch

# Add the parent directory (backend) to sys.path to allow importing modules from the backend folder
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app  # Import the Flask app instance from main.py
import processing.database_api as database_api  # Import the database_api module

# Fixture to create a test client for our Flask app
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

# ----------------------------------------
# Tests for the /database/get route
# ----------------------------------------

@patch('processing.database_api.get_user_data')
@patch('processing.database_api.get_item')
def test_get_from_database_item_success(mock_get_item, mock_get_user_data, client):
    """
    Test the /database/get route for a successful retrieval of a specific item.
    - Mocks the get_item function to return a value.
    - Sends a POST request with necessary data.
    - Verifies the response status code and content.
    """
    # Mock the get_item function to return a specific value
    mock_get_item.return_value = 'mocked_value'

    # Prepare test data
    data = {
        'item': 'some_item',
        'username': 'test_user',
        'table': 'test_table'
    }

    # Send POST request to the route
    response = client.post('/database/get', json=data)

    # Assert response status code is 200
    assert response.status_code == 200, "Expected status code 200 for successful item retrieval"

    # Assert response is JSON and contains the expected data
    assert response.is_json, "Response should be in JSON format"
    json_data = response.get_json()
    assert json_data == {'some_item': 'mocked_value'}, "Response JSON does not match expected value"

    # Verify that get_item was called with correct arguments
    mock_get_item.assert_called_once_with('some_item', 'test_user', 'test_table')
    mock_get_user_data.assert_not_called()  # Ensure get_user_data was not called

@patch('processing.database_api.get_user_data')
@patch('processing.database_api.get_item')
def test_get_from_database_all_success(mock_get_item, mock_get_user_data, client):
    """
    Test the /database/get route for retrieving all user data.
    - Mocks the get_user_data function to return a dictionary.
    - Sends a POST request with 'item' set to 'all'.
    - Verifies the response status code and content.
    """
    # Mock the get_user_data function to return a dictionary
    mock_get_user_data.return_value = {'key1': 'value1', 'key2': 'value2'}

    # Prepare test data
    data = {
        'item': 'all',
        'username': 'test_user',
        # 'table' is not needed when item is 'all'
    }

    # Send POST request to the route
    response = client.post('/database/get', json=data)

    # Assert response status code is 200
    assert response.status_code == 200, "Expected status code 200 for successful retrieval of all data"

    # Assert response is JSON and contains the expected data
    assert response.is_json, "Response should be in JSON format"
    json_data = response.get_json()
    assert json_data == {'all': {'key1': 'value1', 'key2': 'value2'}}, "Response JSON does not match expected value"

    # Verify that get_user_data was called with correct arguments
    mock_get_user_data.assert_called_once_with('test_user')
    mock_get_item.assert_not_called()  # Ensure get_item was not called

def test_get_from_database_no_item(client):
    """
    Test the /database/get route when 'item' is missing from the request.
    - Sends a POST request without 'item'.
    - Verifies that a 400 Bad Request status code is returned.
    """
    # Prepare test data without 'item'
    data = {
        'username': 'test_user',
        'table': 'test_table'
    }

    # Send POST request to the route
    response = client.post('/database/get', json=data)

    # Assert response status code is 400
    assert response.status_code == 400, "Expected status code 400 when 'item' is missing"

    # Assert response contains the appropriate error message
    assert response.is_json, "Response should be in JSON format"
    json_data = response.get_json()
    assert json_data == {'error': 'No item found'}, "Response JSON does not match expected error message"

@patch('processing.database_api.get_user_data')
@patch('processing.database_api.get_item')
def test_get_from_database_item_not_found(mock_get_item, mock_get_user_data, client):
    """
    Test the /database/get route when the requested item is not found.
    - Mocks the get_item function to return None.
    - Sends a POST request with valid data.
    - Verifies that a 404 Not Found status code is returned.
    """
    # Mock the get_item function to return None (item not found)
    mock_get_item.return_value = None

    # Prepare test data
    data = {
        'item': 'nonexistent_item',
        'username': 'test_user',
        'table': 'test_table'
    }

    # Send POST request to the route
    response = client.post('/database/get', json=data)

    # Assert response status code is 404
    assert response.status_code == 404, "Expected status code 404 when item is not found"

    # Assert response contains the appropriate error message
    assert response.is_json, "Response should be in JSON format"
    json_data = response.get_json()
    expected_error = "No data found for item 'nonexistent_item' and username 'test_user' from table 'test_table'"
    assert json_data == {'error': expected_error}, "Response JSON does not match expected error message"

@patch('processing.database_api.get_user_data')
@patch('processing.database_api.get_item')
def test_get_from_database_exception(mock_get_item, mock_get_user_data, client):
    """
    Test the /database/get route when an exception occurs during data retrieval.
    - Mocks the get_item function to raise an exception.
    - Sends a POST request with valid data.
    - Verifies that a 500 Internal Server Error status code is returned.
    """
    # Mock the get_item function to raise an exception
    mock_get_item.side_effect = Exception('Database error')

    # Prepare test data
    data = {
        'item': 'some_item',
        'username': 'test_user',
        'table': 'test_table'
    }

    # Send POST request to the route
    response = client.post('/database/get', json=data)

    # Assert response status code is 500
    assert response.status_code == 500, "Expected status code 500 when an exception occurs"

    # Assert response contains the appropriate error message
    assert response.is_json, "Response should be in JSON format"
    json_data = response.get_json()
    assert json_data == {'error': 'Database error'}, "Response JSON does not match expected error message"

# ----------------------------------------
# Tests for the /database/push route
# ----------------------------------------

@patch('processing.database_api.push_item')
def test_push_to_database_success(mock_push_item, client):
    """
    Test the /database/push route for a successful data push.
    - Mocks the push_item function to return a success message.
    - Sends a POST request with necessary data.
    - Verifies the response status code and content.
    """
    # Mock the push_item function to return a success message
    mock_push_item.return_value = 'Item pushed successfully'

    # Prepare test data
    data = {
        'item': 'some_item',
        'value': 'some_value',
        'username': 'test_user',
        'table': 'test_table'
    }

    # Send POST request to the route
    response = client.post('/database/push', json=data)

    # Assert response status code is 200
    assert response.status_code == 200, "Expected status code 200 for successful data push"

    # Assert response contains the success message
    assert response.is_json, "Response should be in JSON format"
    json_data = response.get_json()
    assert json_data == {'message': 'Item pushed successfully'}, "Response JSON does not match expected message"

    # Verify that push_item was called with correct arguments
    mock_push_item.assert_called_once_with('some_item', 'some_value', 'test_user', 'test_table')

@patch('processing.database_api.push_item')
def test_push_to_database_exception(mock_push_item, client):
    """
    Test the /database/push route when an exception occurs during data push.
    - Mocks the push_item function to raise an exception.
    - Sends a POST request with valid data.
    - Verifies that a 500 Internal Server Error status code is returned.
    """
    # Mock the push_item function to raise an exception
    mock_push_item.side_effect = Exception('Database error')

    # Prepare test data
    data = {
        'item': 'some_item',
        'value': 'some_value',
        'username': 'test_user',
        'table': 'test_table'
    }

    # Send POST request to the route
    response = client.post('/database/push', json=data)

    # Assert response status code is 500
    assert response.status_code == 500, "Expected status code 500 when an exception occurs"

    # Assert response contains the appropriate error message
    assert response.is_json, "Response should be in JSON format"
    json_data = response.get_json()
    assert json_data == {'error': 'Database error'}, "Response JSON does not match expected error message"

# ----------------------------------------
# Tests for the /database/login route
# ----------------------------------------

@patch('processing.database_api.get_item')
def test_login_success(mock_get_item, client):
    """
    Test the /database/login route for a successful login.
    - Mocks the get_item function to return the correct password.
    - Sends a POST request with valid username and password.
    - Verifies the response status code and content.
    """
    # Mock the get_item function to return the correct password
    mock_get_item.return_value = 'correct_password'

    # Prepare test data
    data = {
        'username': 'test_user',
        'password': 'correct_password'
    }

    # Send POST request to the route
    response = client.post('/database/login', json=data)

    # Assert response status code is 200
    assert response.status_code == 200, "Expected status code 200 for successful login"

    # Assert response contains authentication confirmation
    assert response.is_json, "Response should be in JSON format"
    json_data = response.get_json()
    assert json_data == {
        'authenticated': True,
        'message': 'Login successful.'
    }, "Response JSON does not match expected authentication success message"

    # Verify that get_item was called with correct arguments
    mock_get_item.assert_called_once_with('password', 'test_user')

@patch('processing.database_api.get_item')
def test_login_invalid_credentials(mock_get_item, client):
    """
    Test the /database/login route with invalid credentials.
    - Mocks the get_item function to return the correct password.
    - Sends a POST request with incorrect password.
    - Verifies that a 401 Unauthorized status code is returned.
    """
    # Mock the get_item function to return the correct password
    mock_get_item.return_value = 'correct_password'

    # Prepare test data with incorrect password
    data = {
        'username': 'test_user',
        'password': 'wrong_password'
    }

    # Send POST request to the route
    response = client.post('/database/login', json=data)

    # Assert response status code is 401
    assert response.status_code == 401, "Expected status code 401 for invalid credentials"

    # Assert response contains authentication failure message
    assert response.is_json, "Response should be in JSON format"
    json_data = response.get_json()
    assert json_data == {
        'authenticated': False,
        'message': 'Invalid username or password.'
    }, "Response JSON does not match expected authentication failure message"

    # Verify that get_item was called with correct arguments
    mock_get_item.assert_called_once_with('password', 'test_user')

@patch('processing.database_api.get_item')
def test_login_missing_username_or_password(mock_get_item, client):
    """
    Test the /database/login route when username or password is missing.
    - Mocks the get_item function to return None.
    - Sends a POST request without username and password.
    - Verifies that a 401 Unauthorized status code is returned.
    """
    # Mock the get_item function to return None (user not found)
    mock_get_item.return_value = None

    # Prepare test data without username and password
    data = {}

    # Send POST request to the route
    response = client.post('/database/login', json=data)

    # Assert response status code is 401
    assert response.status_code == 401, "Expected status code 401 when username or password is missing"

    # Assert response contains authentication failure message
    assert response.is_json, "Response should be in JSON format"
    json_data = response.get_json()
    assert json_data == {
        'authenticated': False,
        'message': 'Invalid username or password.'
    }, "Response JSON does not match expected authentication failure message"

    # Verify that get_item was called with None as username
    mock_get_item.assert_called_once_with('password', None)



def test_database_get_options_method(client):
    """
    Test the /database/get route with an OPTIONS request.
    - Verifies that the response status code is 200.
    - Checks that the response data is empty.
    """
    response = client.options('/database/get')
    assert response.status_code == 200, "Expected status code 200 for OPTIONS request"
    assert response.get_data(as_text=True) == '', "Response data should be empty for OPTIONS request"

def test_database_push_options_method(client):
    """
    Test the /database/push route with an OPTIONS request.
    - Verifies that the response status code is 200.
    - Checks that the response data is empty.
    """
    response = client.options('/database/push')
    assert response.status_code == 200, "Expected status code 200 for OPTIONS request"
    assert response.get_data(as_text=True) == '', "Response data should be empty for OPTIONS request"

def test_database_login_options_method(client):
    """
    Test the /database/login route with an OPTIONS request.
    - Verifies that the response status code is 200.
    - Checks that the response data is empty.
    """
    response = client.options('/database/login')
    assert response.status_code == 200, "Expected status code 200 for OPTIONS request"
    assert response.get_data(as_text=True) == '', "Response data should be empty for OPTIONS request"
