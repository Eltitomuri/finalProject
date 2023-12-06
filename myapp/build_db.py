import pathlib
from models import Player, Team, db, app
from config import create_app
import csv
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import create_engine

this_dir = pathlib.Path(__file__).parent


def init_db(player_filename: str, team_filename: str):
    """Initialize the database"""
    engine = create_engine(
        "postgresql://finalproject_rwmc_user:UgGVSPpBcrx2zBtaWlnLOpm7rq4wXJGr@dpg-clmch6cjtl8s73aimc9g-a.oregon-postgres.render.com/finalproject_rwmc"
    )
    session = scoped_session(sessionmaker(bind=engine))

    Player.metadata.create_all(engine)
    Team.metadata.create_all(engine)
    with open(this_dir / f"{player_filename}.csv", "r", encoding="utf8") as f:
        content = csv.DictReader(f)
        for item in content:
            print(f"Player data: {item}")
            a_player = Player(
                player=item.get("player"),
                teamAbbreviation=item.get("teamAbbreviation"),
                games=item.get("games"),
                fieldGoals=item.get("fieldGoals"),
                threePointPercent=item.get("threePointPercent"),
                freeThrowPercent=item.get("freeThrowPercent"),
                rebounds=item.get("rebounds"),
                assists=item.get("assists"),
                steals=item.get("steals"),
                blocks=item.get("blocks"),
                personalFouls=item.get("personalFouls"),
                points=item.get("points"),
            )
            session.add(a_player)

    with open(this_dir / f"{team_filename}.csv", "r", encoding="utf8") as f:
        content = csv.DictReader(f)
        for item in content:
            print(f"Team data: {item}")
            a_team = Team(
                teamAbbreviation=item.get("teamAbbreviation"),
                name=item.get("name"),
                location=item.get("location"),
                fieldGoals=item.get("fieldGoals"),
                threePointPercent=item.get("threePointPercent"),
                freeThrowPercent=item.get("freeThrowPercent"),
                rebounds=item.get("rebounds"),
                assists=item.get("assists"),
                steals=item.get("steals"),
                blocks=item.get("blocks"),
                personalFouls=item.get("personalFouls"),
                points=item.get("points"),
            )
            session.add(a_team)

    session.commit()


def create_tables():
    with app.app_context():
        db.create_all()


def main():
    create_tables()
    init_db("player", "team")


if __name__ == "__main__":
    main()
