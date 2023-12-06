from flask import request, redirect, url_for, jsonify
from config import app, db
from models import Player, Team
from build_db import main
from flask_cors import cross_origin


@app.route("/admin", methods=["GET", "POST"])
def admin():
    if request.method == "GET":
        players = Player.query.all()
        teams = Team.query.all()

        players_data = [
            {
                "id": player.id,
                "name": player.name,
                "teamAbbreviation": player.teamAbbreviation,
                "gamesPlayed": player.gamesPlayed,
                "fieldGoals": player.fieldGoals,
                "threePoints": player.threePoints,
                "freeThrowPercentage": player.freeThrowPercentage,
                "rebounds": player.rebounds,
                "assists": player.assists,
                "steals": player.steals,
                "blocks": player.blocks,
                "personalFouls": player.personalFouls,
                "points": player.points,
            }
            for player in players
        ]
        teams_data = [
            {
                "id": team.id,
                "name": team.name,
                "teamAbbreviation": team.teamAbbreviation,
                "gamesPlayed": team.gamesPlayed,
                "fieldGoals": team.fieldGoals,
                "threePoints": team.threePoints,
                "freeThrowPercentage": team.freeThrowPercentage,
                "rebounds": team.rebounds,
                "assists": team.assists,
                "steals": team.steals,
                "blocks": team.blocks,
                "personalFouls": team.personalFouls,
                "points": team.points,
            }
            for team in teams
        ]

        data = {"players": players_data, "teams": teams_data}

        return jsonify(data)


@app.route("/api/v1/build_database")
@cross_origin
def build_db():
    main()
    return jsonify(message="Database built successfully")


if __name__ == "__main__":
    app.run(debug=True)
