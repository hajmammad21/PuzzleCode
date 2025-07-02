from flask import Blueprint, request, jsonify
from models import db, ContactMessage
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User

contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/contact', methods=['POST'])
def submit_contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({'message': 'همه فیلدها الزامی هستند'}), 400

    msg = ContactMessage(name=name, email=email, message=message)
    db.session.add(msg)
    db.session.commit()
    return jsonify({'message': 'پیام شما ارسال شد!'}), 201

@contact_bp.route('/contact/messages', methods=['GET'])
@jwt_required()
def get_messages():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return jsonify({'message': 'Access denied'}), 403

    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    data = [
        {
            'id': m.id,
            'name': m.name,
            'email': m.email,
            'message': m.message,
            'created_at': m.created_at.isoformat(),
            'is_read': m.is_read
        }
        for m in messages
    ]
    return jsonify(data)

@contact_bp.route('/contact/messages/<int:msg_id>/read', methods=['POST'])
@jwt_required()
def mark_message_read(msg_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return jsonify({'message': 'Access denied'}), 403

    msg = ContactMessage.query.get(msg_id)
    if not msg:
        return jsonify({'message': 'Message not found'}), 404

    msg.is_read = True
    db.session.commit()
    return jsonify({'message': 'Marked as read'})