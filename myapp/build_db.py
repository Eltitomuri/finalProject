#!/usr/bin/env python3
"""Build the database"""

from models import Player, Team
from config import db
import csv


def create_tables():
    with db.app.app_context():
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


def main():
    create_tables()
    populate_tables()


if __name__ == "__main__":
    main()
