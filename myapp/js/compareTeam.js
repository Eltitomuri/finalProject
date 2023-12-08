'use strict';document.addEventListener('DOMContentLoaded', function () {
  // Fetch and display initial data and chart
  fetchAndDisplayDataAndChart("fieldGoals");    // Event listener to change the comparison field
  const compareField = document.getElementById('compare-field');    async function fetchAndDisplayDataAndChart(selectedField) {
      try {
          // Retrieve selected teams from localStorage
          const selectedTeams = JSON.parse(localStorage.getItem('selectedTeams'));
          if (!selectedTeams || selectedTeams.length !== 2) {
              console.error('Selected teams are not available in localStorage.');
              return;
          }            const [team1Name, team2Name] = selectedTeams;            const [team1, team2] = await Promise.all([
              fetch(`http://127.0.0.1:5000/api/v1/teams/${team1Name}`).then(response => response.json()),
              fetch(`http://127.0.0.1:5000/api/v1/teams/${team2Name}`).then(response => response.json())
          ]);            displayTeams(team1, team2);
          displayTeamTable(team1, team2);            fetchAndDisplayChart(selectedField, team1, team2);            // Event listener for changing the comparison field
          compareField.addEventListener('change', function () {
              const selectedField = this.value;
              if (!selectedField) {
                  console.error('Selected field is undefined!');
                  return;
              }                fetchAndDisplayChart(selectedField, team1, team2);
          });
      } catch (error) {
          console.error(`Error fetching initial data: ${error}`);
      }
  }    // Function to display team names
  function displayTeams(team1, team2) {
      const teamNamesContainer = document.getElementById('team-names');
      teamNamesContainer.innerHTML = `
          <div>${team1.name}</div>
          <div>${team2.name}</div>
      `;
  }    // Function to display team information in the table
  function displayTeamTable(team1, team2) {
      const teamTableBody = document.getElementById('teamTableBody');
      teamTableBody.innerHTML = '';        // Create a row for Team 1
      const team1Row = document.createElement('tr');
      team1Row.innerHTML = `<td>${team1.name}</td>`;
      const fields = ['location', 'fieldGoals', 'threePointPercent', 'freeThrowPercent', 'rebounds', 'assists', 'steals', 'blocks', 'personalFouls', 'points'];
      fields.forEach(field => {
          team1Row.innerHTML += `<td>${team1[field]}</td>`;
      });
      teamTableBody.appendChild(team1Row);        // Create a row for Team 2
      const team2Row = document.createElement('tr');
      team2Row.innerHTML = `<td>${team2.name}</td>`;
      fields.forEach(field => {
          team2Row.innerHTML += `<td>${team2[field]}</td>`;
      });
      teamTableBody.appendChild(team2Row);
  }    async function fetchAndDisplayChart(selectedField, team1, team2) {
      try {
          const [dataTeam1, dataTeam2] = await Promise.all([
              fetch(`http://127.0.0.1:5000/api/v1/teams/${team1.name}/${selectedField}`).then(response => response.json()),
              fetch(`http://127.0.0.1:5000/api/v1/teams/${team2.name}/${selectedField}`).then(response => response.json())
          ]);            console.log('Data for Team 1:', dataTeam1);
          console.log('Data for Team 2:', dataTeam2);            const xValues = [team1.name, team2.name];
          const yValues = [dataTeam1.value, dataTeam2.value];
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



