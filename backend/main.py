"""Budget Buddy demo API entry point."""

import os
from flask import Flask, jsonify
from flask_cors import CORS
from api import api
from database import init_database


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.update(MAX_CONTENT_LENGTH=32 * 1024, DATABASE_URL=os.getenv("DATABASE_URL", "sqlite:///budget_buddy.db"), JSON_SORT_KEYS=False)
    if test_config:
        app.config.update(test_config)
    origins = [value.strip() for value in os.getenv("FRONTEND_ORIGINS", "http://localhost:8081,http://localhost:19006").split(",") if value.strip()]
    CORS(app, resources={r"/api/*": {"origins": origins}})
    app.register_blueprint(api)

    @app.errorhandler(404)
    def not_found(_error):
        return jsonify({"error": {"code": "not_found", "message": "The requested resource was not found."}}), 404

    @app.errorhandler(413)
    def too_large(_error):
        return jsonify({"error": {"code": "payload_too_large", "message": "The request is too large."}}), 413

    @app.errorhandler(500)
    def server_error(_error):
        return jsonify({"error": {"code": "server_error", "message": "Something went wrong."}}), 500

    @app.after_request
    def security_headers(response):
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        return response

    with app.app_context():
        init_database()
    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=False)
