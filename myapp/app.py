import os
from flask import Flask, request, render_template, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
import csv

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy()


class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey("team.id"))
    team = db.relationship("Team", back_populates="players")


class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    players = db.relationship("Player", back_populates="team")


def create_tables():
    db.create_all()


def populate_tables():
    with open("player.csv", "r") as file:
        reader = csv.reader(file)
        next(reader)
        for row in reader:
            player = Player(name=row[0], team=row[1])
            db.session.add(player)

    with open("team.csv", "r") as file:
        reader = csv.reader(file)
        next(reader)
        for row in reader:
            team = Team(name=row[0])
            db.session.add(team)

    db.session.commit()


@app.route("/")
def home():
    create_tables()
    return render_template("base.html")


@app.route("/team")
def teams():
    teams = Team.query.all()
    players = Player.query.all()
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

    return redirect(url_for("team"))


@app.route("/update_player_team/<int:player_id>", methods=["POST"])
def update_player_team(player_id):
    team_id = request.form.get("team_id")

    if team_id:
        player = Player.query.get(player_id)
        if player:
            player.team = Team.query.get(team_id)
            db.session.commit()
    return redirect(url_for("team"))


@app.route("/remove_player_from_team/<int:player_id>", methods=["POST"])
def remove_player_from_team(player_id):
    player = Player.query.get(player_id)

    if player:
        player.team = None
        db.session.commit()

    return redirect(url_for("team"))


if __name__ == "__main__":
    create_tables()
    populate_tables()
    app.run(debug=True)
