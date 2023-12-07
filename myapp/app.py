from flask import request, jsonify
from config import app, db
from models import Player, Team, PlayerSchema, TeamSchema
from build_db import main
from flask_cors import cross_origin, CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(
    "postgresql://finalproject_rwmc_user:UgGVSPpBcrx2zBtaWlnLOpm7rq4wXJGr@dpg-clmch6cjtl8s73aimc9g-a.oregon-postgres.render.com/finalproject_rwmc"
)
sess = sessionmaker(bind=engine)

CORS(app)

with app.app_context():
    players_schema = PlayerSchema(many=True)
    teams_schema = TeamSchema(many=True)


@app.route("/api/v1/teams/compare")
def get_teams_comparison():
    team1Name = request.args.get("team1Name")
    team2Name = request.args.get("team2Name")
    selectedField = request.args.get("selectedField")
    print(f"Received request for {team1Name}, {team2Name}, {selectedField}")

    try:
        team1 = Team.query.filter_by(name=team1Name).first()
        team2 = Team.query.filter_by(name=team2Name).first()

        if team1 and team2:
            selected_field_value_team1 = getattr(team1, selectedField)
            selected_field_value_team2 = getattr(team2, selectedField)

            if (
                selected_field_value_team1 is not None
                and selected_field_value_team2 is not None
            ):
                return jsonify(
                    {
                        "team1": {
                            "field": selectedField,
                            "value": selected_field_value_team1,
                        },
                        "team2": {
                            "field": selectedField,
                            "value": selected_field_value_team2,
                        },
                    }
                )
            else:
                return (
                    jsonify(
                        {
                            "error": f"Field '{selectedField}' not found for one or more teams."
                        }
                    ),
                    404,
                )
        else:
            return jsonify({"error": "One or more teams not found."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    main()
    app.run(debug=True)
