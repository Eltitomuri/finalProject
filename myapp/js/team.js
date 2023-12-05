// team.js
document.addEventListener('DOMContentLoaded', function () {
    
    fetchTeams();

    
    document.getElementById('addTeamForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const newTeam = {
            abbreviation: document.getElementById('newTeamAbbreviation').value,
           
        };

        
        addTeam(newTeam);
    });

    
    function fetchTeams() {
        
        fetch('/api/teams')
            .then(response => response.json())
            .then(data => populateTeamTable(data))
            .catch(error => console.error('Error fetching teams:', error));
    }

    
    function populateTeamTable(teams) {
        const teamTableBody = document.getElementById('teamTableBody');
        teamTableBody.innerHTML = '';

        teams.forEach(team => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${team.abbreviation}</td>
                <td>
                    <select class="playerDropdown" data-team-abbreviation="${team.abbreviation}">
                        <!-- Player options will be dynamically added here -->
                    </select>
                </td>
            `;
            teamTableBody.appendChild(row);

            
            fetchPlayersForTeam(team.abbreviation);
        });
    }

    
    function fetchPlayersForTeam(teamAbbreviation) {
        
        fetch(`/api/players?teamAbbreviation=${teamAbbreviation}`)
            .then(response => response.json())
            .then(players => populatePlayerDropdown(players, teamAbbreviation))
            .catch(error => console.error(`Error fetching players for ${teamAbbreviation}:`, error));
    }

    
    function populatePlayerDropdown(players, teamAbbreviation) {
        const playerDropdowns = document.querySelectorAll(`.playerDropdown[data-team-abbreviation="${teamAbbreviation}"]`);
        
        playerDropdowns.forEach(dropdown => {
            players.forEach(player => {
                const option = document.createElement('option');
                option.value = player.id;
                option.text = player.name;
                dropdown.add(option);
            });
        });
    }

    
    function addTeam(newTeam) {
        
        fetch('/api/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTeam),
        })
        .then(response => response.json())
        .then(() => {
           
            fetchTeams();
        })
        .catch(error => console.error('Error adding team:', error));
    }
});
