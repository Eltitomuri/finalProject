document.addEventListener('DOMContentLoaded', function () {
    fetchPlayers();

    document.getElementById('compareButton').addEventListener('click', function () {
        comparePlayers();
    });

    function fetchPlayers() {
        fetch('/api/v1/players')
            .then(response => response.json())
            .then(data => populatePlayerTable(data))
            .catch(error => console.error('Error fetching players:', error));
    }

    function populatePlayerTable(players) {
        const playerTableBody = document.getElementById('playerTableBody');
        playerTableBody.innerHTML = '';

        players.forEach(player => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${player.player}</td>
                <td>${player.teamAbbreviation}</td>
                <td>${player.games}</td>
                <td>${player.fieldGoals}</td>
                <td>${player.threePointsPercent}</td>
                <td>${player.freeThrowPercentage}</td>
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
        

    function comparePlayers() {
        const checkboxes = document.querySelectorAll('.compareCheckbox:checked');
        const playerIds = Array.from(checkboxes).map(checkbox => checkbox.dataset.playerId);

        if (playerIds.length === 2) {
            // Redirect to the compare page with selected player IDs
            window.location.href = `/comparePlayer.html?player1=${playerIds[0]}&player2=${playerIds[1]}`;
        } else {
            alert('Please select exactly two players to compare.');
        }
    }
}

    
});


