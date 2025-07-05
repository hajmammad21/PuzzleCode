from flask import Blueprint, jsonify

python_missions_bp = Blueprint('python_missions', __name__)

SEASONS = [
    {
        "id": 1,
        "title": "فصل اول : حروف و اعداد",
        "description": "STRINGS AND INTEGERS",
        "image_url": "/static/images/season1.png"
    },
    {
        "id": 2,
        "title": "Season 2: Functions",
        "description": "تابع‌ها و کاربردشان.",
        "image_url": "/static/images/season2.png"
    }
]

MISSIONS = {
    1: [
        {"id": 101, "title": "متغیر ها : مقدار دهی اولیه", "difficulty": "ابتدایی", "is_locked": False, "is_solved": False},
        {"id": 102, "title": "متغیر ها با مقادیر عبارت ها", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 103, "title": "تابع خالی", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 104, "title": "گرفتن و بازگرداندن آرگومان ها", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 105, "title": "مقدمه ضرب", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 106, "title": "محیط مستطیل", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 107, "title": "زوج یا فرد", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 108, "title": "تعیین علامت اعداد صحیح", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 109, "title": "باقی مانده", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 110, "title": "معکوس کردن رشته", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 111, "title": "بخش پذیر بودن اعداد", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 112, "title": "پیدا کردن اولین حرف در یک رشته", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 113, "title": "طول اعداد", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 114, "title": "بازی تقسیم با ربات", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 115, "title": "حروف صدادار", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 116, "title": "جمع اعداد صحیح", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 117, "title": "تبدیل حروف کوچک به بزرگ", "difficulty": "آسان", "is_locked": True, "is_solved": False},
        {"id": 118, "title": "جایگزینی", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 119, "title": "فاکتوریل", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 120, "title": "جا به جایی نشانگرها", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 121, "title": "چک کردن جایگاه حروف", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 122, "title": "کدام رقم بزرگترین است", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 123, "title": "مجموع اعداد", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 124, "title": "جدا کردن اعداد از یک رشته", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 125, "title": "صفر های آغازین", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 126, "title": "بزرگترین کلمه", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 127, "title": "جمله صحیح", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 128, "title": "بزرگترین عدد بین اعداد", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 129, "title": "پیدا کردن اولین کلمه در یک رشته", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 130, "title": "تساوی بین دو کلمه", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 131, "title": "زبان پرنده", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 132, "title": "شمارش تکرار زیر رشته ها", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 133, "title": "جایگاه حروف (پیشرفته)", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 134, "title": "پیشوند طولانی", "difficulty": "آسان", "is_locked": True, "is_solved": False},
        {"id": 135, "title": "جمله معکوس", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 136, "title": "بررسی عدد آرم استرانگ", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 137, "title": "تبدیل تاریخ", "difficulty": "آسان", "is_locked": True, "is_solved": False},
        {"id": 138, "title": "جایگشت ها", "difficulty": "آسان", "is_locked": True, "is_solved": False},
        {"id": 139, "title": "بررسی سال کبیسه", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 140, "title": "چند صفر در انتها وجود دارد", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 141, "title": "ریشه معادله درجه دوم", "difficulty": "آسان", "is_locked": True, "is_solved": False},
        {"id": 142, "title": "شماره ستون اکسل", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 143, "title": "تعداد اعداد بخش پذیر", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 144, "title": "بررسی عدد کامل", "difficulty": "آسان", "is_locked": True, "is_solved": False},
        {"id": 145, "title": "بیشترین حرف در یک رشته", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 146, "title": "ضرب ارقام", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 147, "title": "چک کردن حروف کوچک و بزرگ در یک رشته", "difficulty": "ابتدایی", "is_locked": True, "is_solved": False},
        {"id": 148, "title": "تبدیل رشته از حروف بزرگ به کوچک", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 149, "title": "تبدیل رشته از حروف کوچک به بزرگ", "difficulty": "متوسط", "is_locked": True, "is_solved": False},
        {"id": 150, "title": "بیشترین زیررشته از یک حرف خاص", "difficulty": "آسان", "is_locked": True, "is_solved": False},
        {"id": 151, "title": "حروف میانی", "difficulty": "آسان", "is_locked": True, "is_solved": False},
        {"id": 152, "title": "برش رشته", "difficulty": "متوسط", "is_locked": True, "is_solved": False},


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

@python_missions_bp.route('/missions/<int:mission_id>')
def get_mission(mission_id):
    for season_missions in MISSIONS.values():
        for mission in season_missions:
            if mission['id'] == mission_id:
                return jsonify(mission)
    return jsonify({"error": "Mission not found"}), 404