from config import app, db, ma


class Player(db.Model):
    __tablename__ = "player"
    player = db.Column(db.String(255), primary_key=True)
    teamAbbreviation = db.Column(db.String(255), nullable=False)
    games = db.Column(db.Integer)
    fieldGoals = db.Column(db.Integer)
    threePointPercent = db.Column(db.Float)
    freeThrowPercent = db.Column(db.Float)
    rebounds = db.Column(db.Integer)
    assists = db.Column(db.Integer)
    steals = db.Column(db.Integer)
    blocks = db.Column(db.Integer)
    personalFouls = db.Column(db.Integer)
    points = db.Column(db.Integer)

    def __repr__(self):
        return f"<Player(name={self.teamAbbreviation!r})>"


class PlayerSchema(ma.SQLAlchemyAutoSchema):
    """Player schema"""

    class Meta:
        """Player schema"""

        model = Player
        load_instance = True

    player = ma.auto_field()
    teamAbbreviation = ma.auto_field()
    games = ma.auto_field()
    fieldGoals = ma.auto_field()
    threePointPercent = ma.auto_field()
    freeThrowPercent = ma.auto_field()
    rebounds = ma.auto_field()
    assists = ma.auto_field()
    steals = ma.auto_field()
    blocks = ma.auto_field()
    personalFouls = ma.auto_field()
    points = ma.auto_field()


class Team(db.Model):
    __tablename__ = "team"
    teamAbbreviation = db.Column(db.String(255), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    fieldGoals = db.Column(db.Integer)
    threePointPercent = db.Column(db.Float)
    freeThrowPercent = db.Column(db.Float)
    rebounds = db.Column(db.Integer)
    assists = db.Column(db.Integer)
    steals = db.Column(db.Integer)
    blocks = db.Column(db.Integer)
    personalFouls = db.Column(db.Integer)
    points = db.Column(db.Integer)

    def __repr__(self):
        return f"<Team(name={self.teamAbbreviation!r})>"


class TeamSchema(ma.SQLAlchemyAutoSchema):
    """Player schema"""

    class Meta:
        """Player schema"""

        model = Team
        load_instance = True

    teamAbbreviation = ma.auto_field()
    name = ma.auto_field()
    location = ma.auto_field()
    fieldGoals = ma.auto_field()
    threePointPercent = ma.auto_field()
    freeThrowPercent = ma.auto_field()
    rebounds = ma.auto_field()
    assists = ma.auto_field()
    steals = ma.auto_field()
    blocks = ma.auto_field()
    personalFouls = ma.auto_field()
    points = ma.auto_field()

class Conference(db.Model):
    __tablename__ = "conference"
    easternConference = db.Column(db.String(255), primary_key=True)
    westernConference = db.Column(db.String(255))

    def __repr__(self):
        return f"<Conference(name={self.easternConference!r})>"
    
class ConferenceSchema(ma.SQLAlchemyAutoSchema):
    """Conference schema"""

    class Meta:
        """Conference schema"""

        model = Conference
        load_instance = True

    easternConference = ma.auto_field()
    westernConference = ma.auto_field()


with app.app_context():
    db.create_all()
