'use strict';document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display initial data and chart
    fetchAndDisplayDataAndChart("fieldGoals");    // Event listener to change the comparison field
    const compareField = document.getElementById('compare-field');    async function fetchAndDisplayDataAndChart(selectedField) {
        try {
            // Retrieve selected players from localStorage
            const selectedPlayers = JSON.parse(localStorage.getItem('selectedPlayers'));
            if (!selectedPlayers || selectedPlayers.length !== 2) {
                console.error('Selected players are not available in localStorage.');
                return;
            }            const [player1Name, player2Name] = selectedPlayers;            const [player1, player2] = await Promise.all([
                fetch(`http://127.0.0.1:5000/api/v1/players/${player1Name}`).then(response => response.json()),
                fetch(`http://127.0.0.1:5000/api/v1/players/${player2Name}`).then(response => response.json())
            ]);            displayPlayers(player1, player2);
            displayPlayerTable(player1, player2);            fetchAndDisplayChart(selectedField, player1, player2);            // Event listener for changing the comparison field
            compareField.addEventListener('change', function () {
                const selectedField = this.value;
                if (!selectedField) {
                    console.error('Selected field is undefined!');
                    return;
                }                fetchAndDisplayChart(selectedField, player1, player2);
            });
        } catch (error) {
            console.error(`Error fetching initial data: ${error}`);
        }
    }    // Function to display player names
    function displayPlayers(player1, player2) {
        const playerNamesContainer = document.getElementById('player-names');
        playerNamesContainer.innerHTML = `
            <div>${player1.player}</div>
            <div>${player2.player}</div>
        `;
    }    // Function to display player information in the table
    function displayPlayerTable(player1, player2) {
        const playerTableBody = document.getElementById('playerTableBody');
        playerTableBody.innerHTML = '';        // Create a row for Player 1
        const player1Row = document.createElement('tr');
        player1Row.innerHTML = `<td>${player1.player}</td>`;
        const fields = ['player', 'teamAbbreviation', 'games', 'fieldGoals', 'threePointPercent', 'freeThrowPercent', 'rebounds', 'assists', 'steals', 'blocks', 'personalFouls', 'points'];
        fields.forEach(field => {
            player1Row.innerHTML += `<td>${player1[field]}</td>`;
        });
        playerTableBody.appendChild(player1Row);        // Create a row for Player 2
        const player2Row = document.createElement('tr');
        player2Row.innerHTML = `<td>${player2.player}</td>`;
        fields.forEach(field => {
            player2Row.innerHTML += `<td>${player2[field]}</td>`;
        });
        playerTableBody.appendChild(player2Row);
    }    async function fetchAndDisplayChart(selectedField, player1, player2) {
        try {
            const [dataPlayer1, dataPlayer2] = await Promise.all([
                fetch(`http://127.0.0.1:5000/api/v1/players/${player1.player}/${selectedField}`).then(response => response.json()),
                fetch(`http://127.0.0.1:5000/api/v1/players/${player2.player}/${selectedField}`).then(response => response.json())
            ]);            console.log('Data for Player 1:', dataPlayer1);
            console.log('Data for Player 2:', dataPlayer2);            const xValues = [player1.player, player2.player];
            const yValues = [dataPlayer1.value, dataPlayer2.value];
            const barColors = ["red", "green"];            createOrUpdateChart(xValues, yValues, barColors);
        } catch (error) {
            console.error(`Error fetching chart data: ${error}`);
        }
    }    function createOrUpdateChart(xValues, yValues, barColors) {
        const chartContainer = document.getElementById('chart-container');
        chartContainer.innerHTML = '<canvas id="myChart"></canvas>';        new Chart("myChart", {
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

