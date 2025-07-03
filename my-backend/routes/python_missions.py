from flask import Blueprint, jsonify

python_missions_bp = Blueprint('python_missions', __name__)

@python_missions_bp.route('/seasons')
def get_seasons():
    return jsonify([
        {
            "id": 1,
            "title": "فصل اول : حروف و اعداد",
            "description": "شروع مسیر پایتون!",
            "image_url": "/static/images/season1.png"
        },
        {
            "id": 2,
            "title": "Season 2: Functions",
            "description": "تابع‌ها و کاربردشان.",
            "image_url": "/static/images/season2.png"
        }
    ])

# Add other endpoints here as you go
