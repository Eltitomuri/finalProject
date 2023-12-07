'use strict';

document.addEventListener('DOMContentLoaded', function () {
    fetchPlayers();

    document.getElementById('compareButton').addEventListener('click', function () {
        comparePlayers();
    });

    function comparePlayers() {
        const checkboxes = document.querySelectorAll('.compareCheckbox:checked');
        const playerIds = Array.from(checkboxes).map(checkbox => checkbox.dataset.playerId);

        if (playerIds.length === 2) {
            const compareButton = document.getElementById('compareButton');
            compareButton.disabled = false;
            window.location.href = `/comparePlayer.html?player1=${playerIds[0]}&player2=${playerIds[1]}`;
        } else {
            alert('Please select exactly two players to compare.');
        }
    }

    async function fetchPlayers() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/v1/players');
            const data = await response.json();
            console.log('Fetched data:', data);
            populatePlayerTable(data.players);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    }

    function populatePlayerTable(players) {
        console.log('Populating table with players:', players);
        const playerTableBody = document.getElementById('playerTableBody');
        playerTableBody.innerHTML = '';

        players.forEach(player => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${player.player}</td>
                <td>${player.teamAbbreviation}</td>
                <td>${player.games}</td>
                <td>${player.fieldGoals}</td>
                <td>${player.threePointPercent}</td>
                <td>${player.freeThrowPercent}</td>
                <td>${player.rebounds}</td>
                <td>${player.assists}</td>
                <td>${player.steals}</td>
                <td>${player.blocks}</td>
                <td>${player.personalFouls}</td>
                <td>${player.points}</td>
                <td><input type="checkbox" class="compareCheckbox" data-player-id="${player.player}"></td>
            `;
            playerTableBody.appendChild(row);
        });
    }
});
