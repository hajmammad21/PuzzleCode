from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, Notification

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/notify', methods=['POST'])
@jwt_required()
def send_notification():
    user_id = get_jwt_identity()
    sender = User.query.get(user_id)
    if not sender or sender.role != 'admin':
        return jsonify({'message': 'Access denied'}), 403

    data = request.get_json()
    message = data.get('message')
    username = data.get('username')  # Optional

    if not message:
        return jsonify({'message': 'Message required'}), 400

    if username:
        target_user = User.query.filter_by(username=username).first()
        if not target_user:
            return jsonify({'message': 'User not found'}), 404
        notif = Notification(user_id=target_user.id, message=message)
        db.session.add(notif)
    else:
        users = User.query.all()
        for u in users:
            notif = Notification(user_id=u.id, message=message)
            db.session.add(notif)

    db.session.commit()
    return jsonify({'message': 'Notification sent'}), 200

