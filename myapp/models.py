# models.py

from flask_sqlalchemy import SQLAlchemy
from config import *

db = SQLAlchemy()

PlayerTeamAssociation = db.Table(
    "player_team_association",
    db.Column("player_id", db.Integer, db.ForeignKey("player.id")),
    db.Column("team_id", db.Integer, db.ForeignKey("team.id")),
)


class Player(db.Model):
    __tablename__ = "player"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    teamAbbreviation = db.Column(db.String(255), nullable=False)
    gamesPlayed = db.Column(db.Integer)
    fieldGoals = db.Column(db.Integer)
    threePoints = db.Column(db.Integer)
    freeThrowPercentage = db.Column(db.Integer)
    rebounds = db.Column(db.Integer)
    assists = db.Column(db.Integer)
    steals = db.Column(db.Integer)
    blocks = db.Column(db.Integer)
    personalFouls = db.Column(db.Integer)
    points = db.Column(db.Integer)


class Team(db.Model):
    __tablename__ = "team"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    teamAbbreviation = db.Column(db.String(255), nullable=False)
    gamesPlayed = db.Column(db.Integer)
    fieldGoals = db.Column(db.Integer)
    threePoints = db.Column(db.Integer)
    freeThrowPercentage = db.Column(db.Integer)
    rebounds = db.Column(db.Integer)
    assists = db.Column(db.Integer)
    steals = db.Column(db.Integer)
    blocks = db.Column(db.Integer)
    personalFouls = db.Column(db.Integer)
    points = db.Column(db.Integer)
