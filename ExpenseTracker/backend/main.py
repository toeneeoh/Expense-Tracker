from flask import Flask
from flask_cors import CORS
import routes
from database.postgres import init_db
from pyngrok import ngrok
from config import NGROK_DOMAIN

# Initialize the Flask application
app = Flask(__name__)
CORS(app)
app.register_blueprint(routes.main_bp)
app.config['TESTING'] = True  # Enable testing mode

if __name__ == '__main__':
    # initialize PostgreSQL database
    init_db()

    # start Ngrok tunnel
    ngrok_tunnel = ngrok.connect(5000, bind_tls=True, hostname=NGROK_DOMAIN)
    print(f" * Ngrok tunnel started at: {ngrok_tunnel.public_url}")
    app.config['SERVER_NAME'] = NGROK_DOMAIN

    app.run(host='0.0.0.0', debug=False) # ngrok fails with True due to rerunning the script
