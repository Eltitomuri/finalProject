'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const selectedTeams = JSON.parse(localStorage.getItem('selectedTeams'));
    const team1Name = selectedTeams[0];
    const team2Name = selectedTeams[1];

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

    // Event listener to change the comparison field
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

    // Function to display team information on the table
    // Function to display team information on the table
function displayTeamTable(team1, team2) {
    const teamTableBody = document.getElementById('teamTableBody');
    // Clear existing rows
    teamTableBody.innerHTML = '';

    // Create a row for Team 1
    const team1Row = document.createElement('tr');
    team1Row.innerHTML = `<td>${team1.name}</td>`;
    const fields = ['location', 'fieldGoals', 'threePointPercent', 'freeThrowPercent', 'rebounds', 'assists', 'steals', 'blocks', 'personalFouls', 'points'];
    fields.forEach(field => {
        team1Row.innerHTML += `<td>${team1[field]}</td>`;
    });
    teamTableBody.appendChild(team1Row);

    // Create a row for Team 2
    const team2Row = document.createElement('tr');
    team2Row.innerHTML = `<td>${team2.name}</td>`;
    fields.forEach(field => {
        team2Row.innerHTML += `<td>${team2[field]}</td>`;
    });
    teamTableBody.appendChild(team2Row);
}


    // Function to fetch data and display chart
    function fetchAndDisplayChart(selectedField, team1Name, team2Name) {
        // Fetch data for the selected field for both teams
        fetch(`http://127.0.0.1:5000/api/v1/teams/${team1Name}/${selectedField}`)
            .then(response => response.json())
            .then(dataTeam1 => {
                fetch(`http://127.0.0.1:5000/api/v1/teams/${team2Name}/${selectedField}`)
                    .then(response => response.json())
                    .then(dataTeam2 => {
                        // Get data for the chart
                        const xValues = [team1Name.name, team2Name.name];
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


