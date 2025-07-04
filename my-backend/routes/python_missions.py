from flask import Blueprint, jsonify

python_missions_bp = Blueprint('python_missions', __name__)

# Example seasons
SEASONS = [
    {
        "id": 1,
        "title": "فصل اول : حروف و اعداد",
        "description": "شروع مسیر پایتون با کار با رشته‌ها و اعداد صحیح.",
        "image_url": "/static/images/season1.png"
    },
    {
        "id": 2,
        "title": "Season 2: Functions",
        "description": "تابع‌ها و کاربردشان.",
        "image_url": "/static/images/season2.png"
    }
]

# Example missions
MISSIONS = {
    1: [
        {"id": 101, "title": "چاپ یک رشته", "difficulty": "آسان", "is_locked": False, "is_solved": False},
        {"id": 102, "title": "اعداد صحیح", "difficulty": "آسان", "is_locked": False, "is_solved": False},
        {"id": 103, "title": "جمله معکوس", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
    ],
    2: [
        {"id": 201, "title": "توابع ساده", "difficulty": "آسان", "is_locked": False, "is_solved": False},
        {"id": 202, "title": "پارامترهای ورودی", "difficulty": "متوسط", "is_locked": True, "is_solved": False}
    ]
}

@python_missions_bp.route('/seasons')
def get_seasons():
    return jsonify(SEASONS)

@python_missions_bp.route('/seasons/<int:season_id>')
def get_season(season_id):
    for s in SEASONS:
        if s["id"] == season_id:
            return jsonify(s)
    return jsonify({"error": "Season not found"}), 404

@python_missions_bp.route('/seasons/<int:season_id>/missions')
def get_season_missions(season_id):
    missions = MISSIONS.get(season_id)
    if missions is None:
        return jsonify({"error": "No missions found"}), 404
    return jsonify(missions)
