from flask import Flask
import pathlib
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


def create_app():
    """Create Flask app"""
    app = Flask(__name__)
    if not pathlib.Path(".flaskenv").exists():
        load_dotenv(pathlib.Path(__file__).parent / pathlib.Path(".flaskenv"))
    app.config.from_prefixed_env()

    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = "postgresql://finalproject_rwmc_user:UgGVSPpBcrx2zBtaWlnLOpm7rq4wXJGr@dpg-clmch6cjtl8s73aimc9g-a.oregon-postgres.render.com/finalproject_rwmc"

    return app


app = create_app()
db = SQLAlchemy(app)
ma = Marshmallow(app)
