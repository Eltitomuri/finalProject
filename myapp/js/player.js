'use strict';

document.addEventListener('DOMContentLoaded', function () {
    fetchPlayers();

    document.getElementById('compareButton').addEventListener('click', function () {
        const selectedPlayers = getSelectedPlayers();
        if (selectedTeams.length === 2) {
            window.location.href = `/compareTeam.html?team1=${selectedPlayers[0]}&team2=${selectedPlayers[1]}`;
        } else {
            alert('Please select exactly two teams for comparison.');
        }
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


        const teamCheckboxes = document.querySelectorAll('.teamCheckbox');
        teamCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });
    }

    function handleCheckboxChange() {
        const selectedTeams = getSelectedTeams();
        const teamCheckboxes = document.querySelectorAll('.playerCheckbox');

        const checkedCount = Array.from(teamCheckboxes).filter(checkbox => checkbox.checked).length;

        teamCheckboxes.forEach(checkbox => {
            const teamId = checkbox.dataset.teamId;
            checkbox.disabled = selectedTeams.includes(teamId) && !checkbox.checked;
        });

        teamCheckboxes.forEach(checkbox => {
            checkbox.disabled = checkbox.checked && checkedCount > 1 && !selectedTeams.includes(checkbox.dataset.teamId);
        });

        const compareButton = document.getElementById('compareButton');
        compareButton.disabled = selectedTeams.length !== 2;
    }

    function getSelectedTeams() {
        const teamCheckboxes = document.querySelectorAll('.teamCheckbox:checked');
        return Array.from(teamCheckboxes).map(checkbox => checkbox.dataset.teamId);
    }
});
