from flask import Flask
from flask_cors import CORS
import routes

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(routes.main_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
