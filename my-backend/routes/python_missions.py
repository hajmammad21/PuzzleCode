from flask import Blueprint, request, jsonify
from models import db, Mission
from flask_jwt_extended import jwt_required

missions_bp = Blueprint('missions', __name__)

@missions_bp.route('/api/missions/<int:mission_id>', methods=['GET'])
def get_mission(mission_id):
    mission = Mission.query.get(mission_id)
    if not mission:
        return jsonify({'error': 'Mission not found'}), 404
    return jsonify({
        'id': mission.id,
        'season_id': mission.season_id,
        'title': mission.title,
        'description': mission.description,
        'image_url': mission.image_url,
        'question': mission.question,
        'hint': mission.hint,
        'starter_code': mission.starter_code,
        'difficulty': mission.difficulty,
        'is_locked': mission.is_locked
    })

@missions_bp.route('/api/missions', methods=['POST'])
#@jwt_required()
def create_mission():
    data = request.json
    mission = Mission(
        season_id = data.get('season_id'),
        title = data.get('title'),
        description = data.get('description'),
        image_url = data.get('image_url'),
        question = data.get('question'),
        hint = data.get('hint'),
        starter_code = data.get('starter_code'),
        difficulty = data.get('difficulty'),
        is_locked = data.get('is_locked', False)
    )
    db.session.add(mission)
    db.session.commit()
    return jsonify({'success': True, 'mission_id': mission.id}), 201

@missions_bp.route('/api/missions/<int:mission_id>', methods=['DELETE'])
def delete_mission(mission_id):
    mission = Mission.query.get(mission_id)
    if not mission:
        return jsonify({'error': 'Mission not found'}), 404
    db.session.delete(mission)
    db.session.commit()
    return jsonify({'success': True}), 200

@missions_bp.route('/api/missions', methods=['GET'])
def get_missions():
    missions = Mission.query.all()
    return jsonify([{
        'id': m.id,
        'season_id': m.season_id,
        'title': m.title,
        'description': m.description,
        'image_url': m.image_url,
        'question': m.question,
        'hint': m.hint,
        'starter_code': m.starter_code,
        'difficulty': m.difficulty,
        'is_locked': m.is_locked
    } for m in missions])