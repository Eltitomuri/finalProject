from models import Player, Team, db
from config import create_app
import csv

app = create_app()


def create_tables():
    with app.app_context():
        db.create_all()


def populate_tables():
    with app.app_context():
        with open("player.csv", "r") as file:
            reader = csv.reader(file)
            next(reader)
            for row in reader:
                player = Player(name=row[0], teamAbbreviation=row[1])
                db.session.add(player)

        with open("team.csv", "r") as file:
            reader = csv.reader(file)
            next(reader)
            for row in reader:
                team = Team(name=row[0], teamAbbreviation=row[1])
                db.session.add(team)

        db.session.commit()


def main():
    create_tables()
    populate_tables()


if __name__ == "__main__":
    main()
