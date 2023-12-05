
document.addEventListener('DOMContentLoaded', function () {
   
    fetchPlayers();

    
    document.getElementById('addPlayerForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const newPlayer = {
            name: document.getElementById('newPlayerName').value,
            team: document.getElementById('newPlayerTeam').value,
            position: document.getElementById('newPlayerPosition').value,
            
        };

        
        addPlayer(newPlayer);
    });

    
    function fetchPlayers() {
        
        fetch('/api/players')
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
                <td>${player.name}</td>
                <td>${player.team}</td>
                <td>${player.position}</td>
                <td><button class="editBtn" data-player-id="${player.id}">Edit</button></td>
                <td><button class="deleteBtn" data-player-id="${player.id}">Delete</button></td>
            `;
            playerTableBody.appendChild(row);
        });

        
        const editButtons = document.querySelectorAll('.editBtn');
        editButtons.forEach(button => {
            button.addEventListener('click', function () {
                const playerId = this.dataset.playerId;
                editPlayer(playerId);
            });
        });

        const deleteButtons = document.querySelectorAll('.deleteBtn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const playerId = this.dataset.playerId;
                
                removePlayer(playerId);
            });
        });
    }

    
    function addPlayer(newPlayer) {
        
        fetch('/api/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlayer),
        })
        .then(response => response.json())
        .then(() => {
           
            fetchPlayers();
        })
        .catch(error => console.error('Error adding player:', error));
    }

   
    function editPlayer(playerId) {
        
        window.location.href = '/edit-player?id=' + playerId;
    }

    
    function removePlayer(playerId) {
        //We still need to implement this 
        
        
    }
});
