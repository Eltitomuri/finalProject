#!/usr/bin/env python3
"""Simple Flask app"""

from flask import render_template, request, redirect, url_for
from models import Player, Team, PlayerSchema, TeamSchema
from config import db, app
from build_db import create_tables

create_tables()


@app.route("/")
def home():
    return render_template("base.html")


@app.route("/team")
def teams():
    teams_data = Team.query.all()
    players_data = Player.query.all()

    team_schema = TeamSchema(many=True)
    player_schema = PlayerSchema(many=True)

    teams = team_schema.dump(teams_data)
    players = player_schema.dump(players_data)

    return render_template("team.html", teams=teams, players=players)


@app.route("/add_player_to_team", methods=["POST"])
def add_player_to_team():
    player_id = request.form.get("player_id")
    team_id = request.form.get("team_id")

    if player_id and team_id:
        player = Player.query.get(player_id)
        if player:
            player.team = Team.query.get(team_id)
            db.session.commit()

    return redirect(url_for("teams"))


@app.route("/update_player_team/<int:player_id>", methods=["POST"])
def update_player_team(player_id):
    team_id = request.form.get("team_id")

    if team_id:
        player = Player.query.get(player_id)
        if player:
            player.team = Team.query.get(team_id)
            db.session.commit()
    return redirect(url_for("teams"))


@app.route("/remove_player_from_team/<int:player_id>", methods=["POST"])
def remove_player_from_team(player_id):
    player = Player.query.get(player_id)

    if player:
        player.team = None
        db.session.commit()

    return redirect(url_for("teams"))
