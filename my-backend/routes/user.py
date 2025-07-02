from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User
from flask import request, jsonify
from flask_bcrypt import Bcrypt

user_bp = Blueprint('user', __name__)

@user_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def user_dashboard():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role
    })

bcrypt = Bcrypt()

@user_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    print("Route hit!")
    data = request.get_json()
    print("CHANGE PASSWORD DATA:", data)  # Debug print
    old_password = data.get('old_password')
    new_password = data.get('new_password')

    if not old_password or not new_password:
        return jsonify({'message': 'لطفاً رمزهای عبور را وارد کنید'}), 400

    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or not bcrypt.check_password_hash(user.password, old_password):
        return jsonify({'message': 'رمز عبور فعلی صحیح نیست'}), 401

    user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    db.session.commit()

    return jsonify({'message': 'رمز عبور با موفقیت تغییر کرد'}), 200