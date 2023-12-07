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


if __name__ == "__main__":
    main()
    app.run(debug=True)
