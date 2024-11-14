from flask import Blueprint
from processing import message_generator, database_api, recommendations_updater

main_bp = Blueprint('main', __name__)

# Register all route handlers
main_bp.register_blueprint(message_generator.bp)
main_bp.register_blueprint(database_api.bp)
main_bp.register_blueprint(recommendations_updater.bp)
