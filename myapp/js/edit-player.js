
document.addEventListener('DOMContentLoaded', function () {
    
    const playerId = window.location.pathname.split('/').pop();

    
    function fetchPlayer(playerId) {
       
        fetch(`/api/players/${playerId}`)
            .then(response => response.json())
            .then(player => populateEditForm(player))
            .catch(error => console.error('Error fetching player:', error));
    }

   
    function populateEditForm(player) {
        const editPlayerForm = document.getElementById('editPlayerForm');
        
       
        editPlayerForm.innerHTML = `
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" value="${player.name}" required>

            <label for="team">Team:</label>
            <input type="text" id="team" name="team" value="${player.team}" required>

            <label for="position">Position:</label>
            <input type="text" id="position" name="position" value="${player.position}" required>

            <!-- Add other fields as needed -->

            <button type="submit">Save Changes</button>
        `;

      
        editPlayerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const updatedPlayer = {
                name: document.getElementById('name').value,
                team: document.getElementById('team').value,
                position: document.getElementById('position').value,
               
            };

            
            updatePlayer(playerId, updatedPlayer);
        });
    }

   
    function updatePlayer(playerId, updatedPlayer) {
        
        fetch(`/api/players/${playerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPlayer),
        })
        .then(response => response.json())
        .then(() => {
            
            window.location.href = '/players';
        })
        .catch(error => console.error('Error updating player:', error));
    }
});
