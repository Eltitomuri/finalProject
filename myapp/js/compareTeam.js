// compareTeam.js

document.addEventListener('DOMContentLoaded', function () {
    // Get team IDs from URL
    const urlParams = new URLSearchParams(window.location.search);
    const team1Name = urlParams.get('team1');
    const team2Name = urlParams.get('team2');

    // Fetch team data based on IDs
    fetch(`http://127.0.0.1:5000/api/v1/teams/${team1Name}`)
        .then(response => response.json())
        .then(team1 => {
            fetch(`http://127.0.0.1:5000/api/v1/teams/${team2Name}`)
                .then(response => response.json())
                .then(team2 => {
                    displayTeams(team1, team2);
                    displayTeamTable(team1, team2);
                    // Fetch and display initial chart (default field: "fieldGoals")
                    fetchAndDisplayChart("fieldGoals", team1Name, team2Name);
                });
        });

    // Event listener for changing the comparison field
    document.getElementById('compare-field').addEventListener('change', function () {
        const selectedField = this.value;
        // Fetch and update the chart based on the selected field
        fetchAndDisplayChart(selectedField, team1Name, team2Name);
    });

    // Function to display team names
    function displayTeams(team1, team2) {
        const teamNamesContainer = document.getElementById('team-names');
        teamNamesContainer.innerHTML = `
            <div>${team1.name}</div>
            <div>${team2.name}</div>
        `;
    }

    // Function to display team information in the table
    function displayTeamTable(team1, team2) {
        const teamTableBody = document.getElementById('teamTableBody');
        // Clear existing rows
        teamTableBody.innerHTML = '';

        // Add rows for each field
        const fields = ['id', 'abbreviation', 'name', 'location', 'fieldGoals', 'threePointPercent', 'freeThrowPercent', 'rebounds', 'assists', 'steals', 'blocks', 'personalFouls', 'points'];
        fields.forEach(field => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${field}</td>
                <td>${team1[field]}</td>
                <td>${team2[field]}</td>
            `;
            teamTableBody.appendChild(row);
        });
    }

    // Function to fetch data and display chart
    function fetchAndDisplayChart(selectedField, team1Name, team2Name) {
        // Fetch data for the selected field for both teams
        fetch(`http://127.0.0.1:5000/api/v1/teams/${team1Name}/${selectedField}`)
            .then(response => response.json())
            .then(dataTeam1 => {
                fetch(`/api/teams/${team2NAme}/${selectedField}`)
                    .then(response => response.json())
                    .then(dataTeam2 => {
                        // Get data for the chart
                        const xValues = [team1.name, team2.name];
                        const yValues = [dataTeam1.value, dataTeam2.value];
                        const barColors = ["red", "green"];

                        // Call the function to create or update the chart
                        createOrUpdateChart(xValues, yValues, barColors);
                    });
            });
    }

    // Function to create or update the chart
    function createOrUpdateChart(xValues, yValues, barColors) {
        const chartContainer = document.getElementById('chart-container');
        // Remove any existing chart
        chartContainer.innerHTML = '<canvas id="myChart"></canvas>';
        
        // Create a new chart
        new Chart("myChart", {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                // Customize options as needed
            }
        });
    }
});

