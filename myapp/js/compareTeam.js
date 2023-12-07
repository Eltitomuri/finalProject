document.addEventListener('DOMContentLoaded', function () {
    // Get team IDs from URL
    const urlParams = new URLSearchParams(window.location.search);
    const team1Id = urlParams.get('team1');
    const team2Id = urlParams.get('team2');

    // Fetch team data based on IDs
    fetch(`/api/teams/<span class="math-inline">\{team1Id\}\`\)
\.then\(response \=\> response\.json\(\)\)
\.then\(team1 \=\> \{
fetch\(\`/api/teams/</span>{team2Id}`)
                .then(response => response.json())
                .then(team2 => {
                    displayTeams(team1, team2);
                    displayTeamTable(team1, team2);
                    // Fetch and display initial chart (default field: "fieldGoals")
                    fetchAndDisplayChart("fieldGoals", team1Id, team2Id);
                });
        });

    // Event listener for changing the comparison field
    document.getElementById('compare-field').addEventListener('change', function () {
        const selectedField = this.value;
        // Fetch and update the chart based on the selected field
        fetchAndDisplayChart(selectedField, team1Id, team2Id);
    });

    // Function to display team names
    function displayTeams(team1, team2) {
        const teamNamesContainer = document.getElementById('team-names');
        teamNamesContainer.innerHTML = `
            <div><span class="math-inline">\{team1\.name\}</div\>
<div\></span>{team2.name}</div>
        `;
    }


