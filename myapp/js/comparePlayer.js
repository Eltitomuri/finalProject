document.addEventListener('DOMContentLoaded', function () {
    // Get player IDs from URL
    const urlParams = new URLSearchParams(window.location.search);
    const player1Id = urlParams.get('player1');
    const player2Id = urlParams.get('player2');

    // Fetch player data based on IDs
    fetch(`http://127.0.0.1:5000/api/v1/players/${player1Id}`)
        .then(response => response.json())
        .then(player1 => {
            fetch(`http://127.0.0.1:5000/api/v1/players/${player2Id}`)
                .then(response => response.json())
                .then(player2 => {
                    displayPlayers(player1, player2);
                    displayPlayerTable(player1, player2);
                    // Fetch and display initial chart (default field: "games")
                    fetchAndDisplayChart("games", player1Id, player2Id);
                });
        });

    // Event listener for changing the comparison field
    document.getElementById('compare-field').addEventListener('change', function () {
        const selectedField = this.value;
        // Fetch and update the chart based on the selected field
        fetchAndDisplayChart(selectedField, player1Id, player2Id);
    });

    // Function to display player names
    function displayPlayers(player1, player2) {
        const playerNamesContainer = document.getElementById('player-names');
        playerNamesContainer.innerHTML = `
            <div>${player1.name}</div>
            <div>${player2.name}</div>
        `;
    }

    // Function to display player information in the table
    function displayPlayerTable(player1, player2) {
        const playerTableBody = document.getElementById('playerTableBody');
        // Clear existing rows
        playerTableBody.innerHTML = '';

        // Add rows for each field
        const fields = ['name', 'teamAbbreviation', 'games', 'fieldGoals', 'threePointPercent', 'freeThrowPercent', 'rebounds', 'assists', 'steals', 'blocks', 'personalFouls', 'points'];
        fields.forEach(field => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${field}</td>
                <td>${player1[field]}</td>
                <td>${player2[field]}</td>
            `;
            playerTableBody.appendChild(row);
        });
    }

    // Function to fetch data and display chart
    function fetchAndDisplayChart(selectedField, player1Id, player2Id) {
        // Fetch data for the selected field for both players
        fetch(`http://127.0.0.1:5000/api/v1/players/${player1Id}/${selectedField}`)
            .then(response => response.json())
            .then(dataPlayer1 => {
                fetch(`http://127.0.0.1:5000/api/v1/players/${player2Id}/${selectedField}`)
                    .then(response => response.json())
                    .then(dataPlayer2 => {
                        // Get data for the chart
                        const xValues = [player1Id.name, player2Id.name];
                        const yValues = [dataPlayer1.value, dataPlayer2.value];
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
