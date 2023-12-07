'use strict';

document.addEventListener('DOMContentLoaded', function () {

    fetchTeams();
    document.getElementById('compareButton').addEventListener('click', function () {
        const selectedTeams = getSelectedTeams();
        if (selectedTeams.length === 2) {
            window.location.href = `/compareTeam.html?team1=${selectedTeams[0]}&team2=${selectedTeams[1]}`;
        } else {
            alert('Please select exactly two teams for comparison.');
        }
    });

    async function fetchTeams() {
        let data = await fetch('http://127.0.0.1:5000/api/v1/teams').then(response => response.json());
        console.log('Fetched data:', data);
        populateTeamTable(data.teams);
    }

    function populateTeamTable(teams) {
        const teamTableBody = document.getElementById('teamTableBody');
        teamTableBody.innerHTML = '';

        teams.forEach(team => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${team.id}</td>
                <td>${team.abbreviation}</td>
                <td>${team.name}</td>
                <td>${team.location}</td>
                <td>${team.fieldGoals}</td>
                <td>${team.threePointPercent}</td>
                <td>${team.freeThrowPercent}</td>
                <td>${team.rebounds}</td>
                <td>${team.assists}</td>
                <td>${team.steals}</td>
                <td>${team.blocks}</td>
                <td>${team.personalFouls}</td>
                <td>${team.points}</td>
                <td><input type="checkbox" class="teamCheckbox" data-team-id="${team.id}"></td>
            `;
            teamTableBody.appendChild(row);
        });

        const teamCheckboxes = document.querySelectorAll('.teamCheckbox');
        teamCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });
    }

    function handleCheckboxChange() {
        const selectedTeams = getSelectedTeams();

        const teamCheckboxes = document.querySelectorAll('.teamCheckbox');
        teamCheckboxes.forEach(checkbox => {
            const teamId = checkbox.dataset.teamId;
            checkbox.disabled = selectedTeams.includes(teamId) && !checkbox.checked;
        });

        const compareButton = document.getElementById('compareButton');
        compareButton.disabled = selectedTeams.length !== 2;
    }

    function getSelectedTeams() {
        const teamCheckboxes = document.querySelectorAll('.teamCheckbox:checked');
        return Array.from(teamCheckboxes).map(checkbox => checkbox.dataset.teamId);
    }
});
