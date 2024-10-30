from flask import Blueprint
from processing import text_processor

main_bp = Blueprint('main', __name__)

# Register all route handlers
main_bp.register_blueprint(text_processor.bp)
