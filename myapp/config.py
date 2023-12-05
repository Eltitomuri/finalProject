#!/usr/bin/env python3
"""Simple Flask app config"""

import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


def create_app():
    """Create Flask app"""
    this_app = Flask(__name__)
    this_app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "SQLALCHEMY_DATABASE_URI"
    )
    return this_app


app = create_app()
db = SQLAlchemy(app)
ma = Marshmallow(app)

if __name__ == "__main__":
    with app.app_context():
        app.run(debug=True)
