document.addEventListener('DOMContentLoaded', function () {
    fetchConferenceData();
});

function fetchConferenceData() {
    fetch(`http://127.0.0.1:5000/api/v1/conferences`)
        .then(response => response.json())
        .then(conferenceData => {
            displayConferenceTable(conferenceData);
        })
        .catch(error => {
            console.error('Error fetching conference data:', error);
        });
}

function displayConferenceTable(conferenceData) {
    const table = document.getElementById('conferences-table');
    table.innerHTML = '';

    // Check if conferenceData is an array and is not empty
    if (Array.isArray(conferenceData) && conferenceData.length > 0) {
        // Extract headers dynamically from the first object
        const headers = Object.keys(conferenceData[0]);

        // Add table header
        const headerRow = table.insertRow(0);

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        // Add table rows
        conferenceData.forEach(conference => {
            const row = table.insertRow(-1);

            // Add team data to each cell
            headers.forEach(header => {
                const cell = row.insertCell(-1);
                cell.textContent = conference[header];
            });
        });
    }
}


