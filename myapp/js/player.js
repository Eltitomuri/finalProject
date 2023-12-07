'use strict';

document.addEventListener('DOMContentLoaded', function () {
    fetchPlayers();

    document.getElementById('compareButton').addEventListener('click', function () {
        comparePlayers();
    });

    async function fetchPlayers() {
        let data = await fetch('http://127.0.0.1:5000/api/v1/players').then(response => response.json());
        console.log('Fetched data:', data);
        populatePlayerTable(data.players);
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

        const compareButton = document.getElementById('compareButton');
        compareButton.disabled = false;

        const compareCheckboxes = document.querySelectorAll('.compareCheckbox');
        compareCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });

        function comparePlayers() {
            const checkboxes = document.querySelectorAll('.compareCheckbox:checked');
            const playerIds = Array.from(checkboxes).map(checkbox => checkbox.dataset.playerId);

            if (playerIds.length === 2) {
                window.location.href = `/comparePlayer.html?player1=${playerIds[0]}&player2=${playerIds[1]}`;
            } else {
                alert('Please select exactly two players to compare.');
            }
        }
    }
});
