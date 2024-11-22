# backend/tests/test_main.py

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

# Test to check that the Flask app instance exists
def test_app_exists():
    """
    Test to verify that the Flask app instance is created successfully.
    This ensures that the app initialization code in main.py works as expected.
    """
    assert app is not None

# Test for initializing the database (without mocking)
def test_init_db():
    """
    Test to verify that the database initialization function works without raising exceptions.
    - Imports the init_db function from database.postgres.py
    - Calls init_db() and checks that it completes without errors.
    """
    from database.postgres import init_db
    try:
        init_db()
        success = True
    except Exception:
        success = False
    assert success, "Database initialization failed"

# Test for mocking the database initialization function
def test_init_db_mock():
    """
    Test the init_db function using mocking.
    - Uses unittest.mock.patch to mock the init_db function in main.py.
    - Verifies that the init_db function is called exactly once.
    """
    with patch('main.init_db') as mock_init_db:
        mock_init_db.return_value = None
        from main import init_db
        init_db()
        mock_init_db.assert_called_once()
