import unittest
import sys
import os.path
import unittest
from flask import Flask
from flask_cors import CORS
import routes

# Initialize the Flask application
app = Flask(__name__)
CORS(app)
app.register_blueprint(routes.main_bp)
app.config['TESTING'] = True  # Enable testing mode

class RoutesTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Set up a test client
        cls.client = app.test_client()

    def test_example_route(self):
        # Replace '/example' with a real route from routes.main_bp
        response = self.client.get('/example')
        self.assertEqual(response.status_code, 200)
        # Add assertions based on the expected response
        # self.assertIn(b'Expected Response', response.data)

if __name__ == '__main__':
    unittest.main()
