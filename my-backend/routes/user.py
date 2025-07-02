from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User
from flask import request, jsonify
from flask_bcrypt import Bcrypt
from models import Notification

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

@user_bp.route('/notifications', methods=['GET'])
@jwt_required()
def get_notifications():
    user_id = get_jwt_identity()
    notifications = Notification.query.filter_by(user_id=user_id).order_by(Notification.created_at.desc()).all()
    result = [
        {
            "id": n.id,
            "message": n.message,
            "is_read": n.is_read,
            "created_at": n.created_at.isoformat()
        }
        for n in notifications
    ]
    return jsonify(result)

# Mark notification as read
@user_bp.route('/notifications/<int:notif_id>/read', methods=['POST'])
@jwt_required()
def mark_notification_read(notif_id):
    user_id = get_jwt_identity()
    notif = Notification.query.filter_by(id=notif_id, user_id=user_id).first()
    if not notif:
        return jsonify({"message": "Notification not found"}), 404
    notif.is_read = True
    db.session.commit()
    return jsonify({"message": "Marked as read"})

# Create notification (for testing/demo)
@user_bp.route('/notifications', methods=['POST'])
@jwt_required()
def create_notification():
    user_id = get_jwt_identity()
    data = request.get_json()
    message = data.get('message')
    if not message:
        return jsonify({"message": "Message required"}), 400
    notif = Notification(user_id=user_id, message=message)
    db.session.add(notif)
    db.session.commit()
    return jsonify({"message": "Notification created"})

@user_bp.route('/notifications/<int:notif_id>', methods=['DELETE'])
@jwt_required()
def delete_notification(notif_id):
    user_id = get_jwt_identity()
    notif = Notification.query.filter_by(id=notif_id, user_id=user_id).first()
    if not notif:
        return jsonify({"message": "Notification not found"}), 404
    db.session.delete(notif)
    db.session.commit()
    return jsonify({"message": "Notification deleted"})

