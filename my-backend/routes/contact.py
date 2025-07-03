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
    phone = data.get('phone')

    if not name or not email or not message:
        return jsonify({'message': 'همه فیلدها الزامی هستند'}), 400

    msg = ContactMessage(name=name, email=email, message=message, phone=phone)
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

    # Pagination parameters from the query string, default to page 1, 10 per page
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))

    q = ContactMessage.query.order_by(ContactMessage.created_at.desc())
    pagination = q.paginate(page=page, per_page=per_page, error_out=False)
    data = [{
        'id': m.id,
        'name': m.name,
        'email': m.email,
        'phone': m.phone,
        'message': m.message,
        'created_at': m.created_at.isoformat(),
        'is_read': m.is_read
    } for m in pagination.items]

    return jsonify({
        'messages': data,
        'total': pagination.total,
        'pages': pagination.pages,
        'page': pagination.page,
        'per_page': pagination.per_page
    })


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

@contact_bp.route('/contact/messages/<int:msg_id>', methods=['DELETE'])
@jwt_required()
def delete_message(msg_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'admin':
        return jsonify({'message': 'Access denied'}), 403

    msg = ContactMessage.query.get(msg_id)
    if not msg:
        return jsonify({'message': 'Message not found'}), 404

    db.session.delete(msg)
    db.session.commit()
    return jsonify({'message': 'Deleted'})