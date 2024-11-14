from flask import Flask
from flask_cors import CORS
import routes
from database.postgres import init_db

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(routes.main_bp)

if __name__ == '__main__':
    # initialize PostgreSQL database
    init_db()

    app.run(host='0.0.0.0', debug=True)