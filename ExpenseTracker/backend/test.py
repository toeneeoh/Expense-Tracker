import unittest
import sys
import os.path
import unittest
from app import app
from routes import routes

class FlaskAppTestCase(unittest.TestCase):
    
    # Setting up test client and app context
    def setUp(self):
        app.register_blueprint(routes)  # Registering routes blueprint with the app
        app.config['TESTING'] = True  # Enable testing mode
        self.client = app.test_client()  # Create a test client
        
    # Test home route in app.py
    def test_home(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)  # Check for 200 OK status
        self.assertIn(b"Hello, World!", response.data)  # Check if the correct message is in the response

    # Test test route in routes.py
    def test_test_route(self):
        response = self.client.get('/test')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Test route", response.data)
        self.assertIn(b"success", response.json['status'])  # Check for the success status

    # You can also add more tests for other routes and cases here.

if __name__ == '__main__':
    unittest.main()
