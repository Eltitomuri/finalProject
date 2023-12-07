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

@app.route("/api/v1/teams/<teamName>/<selectedField>")
def get_team_field(teamName, selectedField):
    try:
        team = Team.query.filter_by(name=teamName).first()
        if team:
            
            if hasattr(team, selectedField):
                
                selected_field_value = getattr(team, selectedField)
                
                if isinstance(selected_field_value, bool):
                   
                    selected_field_value = str(selected_field_value)
                return jsonify({"field": selectedField, "value": selected_field_value})
            else:
                return jsonify({"error": f"Field '{selectedField}' not found in model."}), 404
        else:
            return jsonify({"error": "Team not found."}), 404
    except Exception as e:
        
        logging.error(f"Error occurred while fetching team field: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/v1/players/<player>/<selectedField>")
def get_player_field(player, selectedField):
    try:
        player = Player.query.filter_by(player=player).first()
        if player:
            if hasattr(player, selectedField):
                selected_field_value = getattr(player, selectedField)
                if isinstance(selected_field_value, bool):
                    selected_field_value = str(selected_field_value)
                return jsonify({"field": selectedField, "value": selected_field_value})
            else:
                return jsonify({"error": f"Field '{selectedField}' not found in model."}), 404
        else:
            return jsonify({"error": "Player not found."}), 404
    except Exception as e:
        logging.error(f"Error occurred while fetching player field: {e}")
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    main()
    app.run(debug=True)
