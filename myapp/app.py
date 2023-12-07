from flask import request, jsonify
from config import app, db
from models import Player, Team, PlayerSchema, TeamSchema
from build_db import main
from flask_cors import cross_origin, CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(
    "postgresql://finalproject_rwmc_user:UgGVSPpBcrx2zBtaWlnLOpm7rq4wXJGr@dpg-clmch6cjtl8s73aimc9g-a.oregon-postgres.render.com/finalproject_rwmc"
)
sess = sessionmaker(bind=engine)

CORS(app)

with app.app_context():
    players_schema = PlayerSchema(many=True)
    teams_schema = TeamSchema(many=True)


@app.route("/api/v1/players")
def get_players():
    players = Player.query.all()
    players_data = [
        {
            "player": player.player,
            "teamAbbreviation": player.teamAbbreviation,
            "games": player.games,
            "fieldGoals": player.fieldGoals,
            "threePointPercent": player.threePointPercent,
            "freeThrowPercent": player.freeThrowPercent,
            "rebounds": player.rebounds,
            "assists": player.assists,
            "steals": player.steals,
            "blocks": player.blocks,
            "personalFouls": player.personalFouls,
            "points": player.points,
        }
        for player in players
    ]
    return jsonify({"players": players_schema.dump(players_data)})


@app.route("/api/v1/teams")
def get_teams():
    teams = Team.query.all()
    teams_data = [
        {
            "teamAbbreviation": team.teamAbbreviation,
            "name": team.name,
            "location": team.location,
            "fieldGoals": team.fieldGoals,
            "threePointPercent": team.threePointPercent,
            "freeThrowPercent": team.freeThrowPercent,
            "rebounds": team.rebounds,
            "assists": team.assists,
            "steals": team.steals,
            "blocks": team.blocks,
            "personalFouls": team.personalFouls,
            "points": team.points,
        }
        for team in teams
    ]
    return jsonify({"teams": teams_schema.dump(teams_data)})

@app.route("/api/v1/teams/<teamName>")
def get_team(teamName):
    try:
        team = Team.query.filter_by(name=teamName).first()
        if team:
            team_data = {
                "teamAbbreviation": team.teamAbbreviation,
                "name": team.name,
                "location": team.location,
                "fieldGoals": team.fieldGoals,
                "threePointPercent": team.threePointPercent,
                "freeThrowPercent": team.freeThrowPercent,
                "rebounds": team.rebounds,
                "assists": team.assists,
                "steals": team.steals,
                "blocks": team.blocks,
                "personalFouls": team.personalFouls,
                "points": team.points,
            }
            return jsonify(team_data)
        else:
            return jsonify({"error": "Team not found."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/api/v1/players/<player>")
def get_player(player):
    try:
        player = Player.query.filter_by(player=player).first()
        if player:
            player_data = {
            "player": player.player,
            "teamAbbreviation": player.teamAbbreviation,
            "games": player.games,
            "fieldGoals": player.fieldGoals,
            "threePointPercent": player.threePointPercent,
            "freeThrowPercent": player.freeThrowPercent,
            "rebounds": player.rebounds,
            "assists": player.assists,
            "steals": player.steals,
            "blocks": player.blocks,
            "personalFouls": player.personalFouls,
            "points": player.points,
            }
            return jsonify(player_data)
        else:
            return jsonify({"error": "Player not found."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/v1/teams/<teamName>/<selectedField>")
def get_team_field(team1Name, selectedField):
    try:
        team = Team.query.filter_by(name=team1Name).first()
        if team:
            selected_field_value = getattr(team, selectedField)
            if selected_field_value is not None:
                return jsonify({"field": selectedField, "value": selected_field_value})
            else:
                return jsonify({"error": f"Field '{selectedField}' not found."}), 404
        else:
            return jsonify({"error": "Field not found."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    main()
    app.run(debug=True)
