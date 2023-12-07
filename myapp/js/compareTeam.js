document.addEventListener('DOMContentLoaded', function () {
<<<<<<< HEAD
    // Get team IDs from URL
    const urlParams = new URLSearchParams(window.location.search);
    const team1Id = urlParams.get('team1');
    const team2Id = urlParams.get('team2');
  
    // Fetch team data based on IDs
    fetch(`http://127.0.0.1:5000/api/v1/teams/${team1Name}`)
      .then(response => response.json())
      .then(team1 => {
        fetch(`http://127.0.0.1:5000/api/v1/teams/${team2Name}`)
          .then(response => response.json())
          .then(team2 => {
            displayTeams(team1, team2);
            displayTeamTable(team1, team2);
            // Create initial chart with fieldGoals data
            const initialField = "fieldGoals";
            fetchAndDisplayChart(initialField, team1Id, team2Id);
          });
      });
  
    // Event listener for changing the comparison field
    document.getElementById('compare-field').addEventListener('change', function () {
      const selectedField = this.value;
      // Fetch and update the chart based on the selected field
      fetchAndDisplayChart(selectedField, team1Id, team2Id);
    });
  
=======
    // Get team names from localStorage
    const team1Name = localStorage.getItem('team1');
    const team2Name = localStorage.getItem('team2');

    // Check if team names are available in localStorage
    if (team1Name && team2Name) {
        // Fetch team data based on names
        fetchTeamComparison(team1Name, team2Name);

        // Event listener for changing the comparison field
        document.getElementById('compare-field').addEventListener('change', function () {
            const selectedField = this.value;
            // Fetch and update the chart based on the selected field
            fetchAndDisplayChart(selectedField, team1Name, team2Name);
        });
    } else {
        console.error('Team names not found in localStorage. Fetching from API.');
        // If team names are not found in localStorage, fetch them from the API
        // and save them to localStorage for future use
        fetch('http://127.0.0.1:5000/api/v1/teams/compare?team1Name=Team1&team2Name=Team2')
            .then(response => response.json())
            .then(data => {
                if (data.team1 && data.team2) {
                    const team1 = data.team1.name;
                    const team2 = data.team2.name;
                    localStorage.setItem('team1', team1);
                    localStorage.setItem('team2', team2);
                    fetchTeamComparison(team1, team2);
                } else {
                    console.error('Error fetching team data from API.');
                }
            })
            .catch(error => {
                console.error('Error fetching team data from API:', error);
            });
    }

    // Function to fetch team comparison data and display initial chart
    function fetchTeamComparison(team1Name, team2Name) {
        const selectedField = "fieldGoals";  // Default field for initial chart
        fetch(`http://127.0.0.1:5000/api/v1/teams/compare?team1Name=${team1Name}&team2Name=${team2Name}&selectedField=${selectedField}`)
            .then(response => response.json())
            .then(data => {
                // Display team names, table, and initial chart
                displayTeams(data.team1, data.team2);
                displayTeamTable(data.team1, data.team2);
                fetchAndDisplayChart(selectedField, team1Name, team2Name);
            });
    }



>>>>>>> f4facc08b75a59e1ada6f39e232b662c2b9a79ef
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
<<<<<<< HEAD
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
=======
        const teamTableBody = document.getElementById('teamTableBody');
        // Clear existing rows
        teamTableBody.innerHTML = '';

        // Add rows for each field
        const fields = ['abbreviation', 'name', 'location', 'fieldGoals', 'threePointPercent', 'freeThrowPercent', 'rebounds', 'assists', 'steals', 'blocks', 'personalFouls', 'points'];
        fields.forEach(field => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${field}</td>
                <td>${team1[field]}</td>
                <td>${team2[field]}</td>
            `;
            teamTableBody.appendChild(row);
        });
>>>>>>> f4facc08b75a59e1ada6f39e232b662c2b9a79ef
    }
  
    // Function to fetch data and display chart
    function fetchAndDisplayChart(selectedField, team1Name, team2Name) {
      // Fetch data for the selected field for both teams
      fetch(`http://127.0.0.1:5000/api/v1/teams/${team1Name}/${selectedField}`)
        .then(response => response.json())
        .then(dataTeam1 => {
          fetch(`http://127.0.0.1:5000/api/v1/teams/${team2NAme}/${selectedField}`)
            .then(response => response.json())
<<<<<<< HEAD
            .then(dataTeam2 => {
              // Get data for the chart
              const xValues = [team1.name, team2.name];
              const yValues = [dataTeam1.value, dataTeam2.value];
              const barColors = ["red", "green"];
  
              // Call the function to create or update the chart
              createOrUpdateChart(xValues, yValues, barColors);
=======
            .then(dataTeam1 => {
                fetch(`http://127.0.0.1:5000/api/v1/teams/${team2Name}/${selectedField}`)
                    .then(response => response.json())
                    .then(dataTeam2 => {
                        // Get data for the chart
                        const xValues = [team1Name, team2Name];
                        const yValues = [dataTeam1.value, dataTeam2.value];
                        const barColors = ["red", "green"];

                        // Call the function to create or update the chart
                        createOrUpdateChart(xValues, yValues, barColors);
                    });
>>>>>>> f4facc08b75a59e1ada6f39e232b662c2b9a79ef
            });
        });
    }
<<<<<<< HEAD
  
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
  

=======
});
>>>>>>> f4facc08b75a59e1ada6f39e232b662c2b9a79ef
