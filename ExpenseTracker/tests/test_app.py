import pytest
import sys
import os
from flask import Flask

# Adjust the path to locate app.py
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend')))

from app import app

@pytest.fixture
def client():
    """
    Pytest fixture that sets up the Flask app client with registered blueprints.
    """
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# Test Home Route from app.py
def test_home_route(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b"Hello, World!" in response.data

# Test the process-text route from routes.py
def test_some_text_processing_route(client):
    response = client.get('/process-text')
    assert response.status_code == 200
    assert b'Expected content' in response.data
