from flask import Blueprint, jsonify
from models import Season, Mission
from models import db, Season
from flask import request

seasons_bp = Blueprint('seasons', __name__)

@seasons_bp.route('/api/seasons', methods=['GET'])
def get_seasons():
    seasons = Season.query.all()
    return jsonify([
        {"id": s.id, "title": s.title, "description": s.description, "image_url": s.image_url}
        for s in seasons
    ])

@seasons_bp.route('/api/seasons/<int:season_id>', methods=['GET'])
def get_season(season_id):
    season = Season.query.get(season_id)
    if not season:
        return jsonify({'error': 'Season not found'}), 404
    return jsonify({
        'id': season.id,
        'title': season.title,
        'description': season.description,
        'image_url': season.image_url,
    })

@seasons_bp.route('/api/seasons/<int:season_id>/missions', methods=['GET'])
def get_season_missions(season_id):
    missions = Mission.query.filter_by(season_id=season_id).all()
    return jsonify([
        {
            'id': m.id,
            'title': m.title,
            'difficulty': m.difficulty,
            'is_locked': m.is_locked,
            # add other fields if needed
        }
        for m in missions
    ])
@seasons_bp.route('/api/seasons', methods=['POST'])
def add_season():
    data = request.json
    season = Season(
        title=data.get('title'),
        description=data.get('description'),
        image_url=data.get('image_url')
    )
    db.session.add(season)
    db.session.commit()
    return jsonify({'success': True, 'season_id': season.id}), 201

@seasons_bp.route('/api/seasons/<int:season_id>', methods=['PUT'])
def update_season(season_id):
    season = Season.query.get(season_id)
    if not season:
        return jsonify({'error': 'Season not found'}), 404
    data = request.json
    season.title = data.get('title', season.title)
    season.description = data.get('description', season.description)
    season.image_url = data.get('image_url', season.image_url)
    db.session.commit()
    return jsonify({'success': True}), 200

@seasons_bp.route('/api/seasons/<int:season_id>', methods=['DELETE'])
def delete_season(season_id):
    season = Season.query.get(season_id)
    if not season:
        return jsonify({'error': 'Season not found'}), 404
    db.session.delete(season)
    db.session.commit()
    return jsonify({'success': True}), 200