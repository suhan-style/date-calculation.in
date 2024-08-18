document.addEventListener('DOMContentLoaded', function() {
    const datePickerContainer = document.getElementById('date-picker-container');
    const arrays = [
        { label: "YEARLY S/R", days: [21, 30, 45, 49, 55, 60, 90, 100, 120, 180, 225, 240, 270, 300, 315, 360] },
        { label: "WEEKLY BREAKOUT", days: [315, 420, 630, 840, 945, 1200, 1575, 1680, 1890, 2100, 2205, 2520] },
        { label: "3Yrs CYCLE", days: [137, 274, 365, 411, 547, 730, 821, 912, 958, 1095] },
        { label: "5Yrs CYCLE", days: [228, 456, 608, 684, 913, 1217, 1369, 1521, 1597, 1825] }
        // Add more arrays as needed
    ];

    // Create date picker sections dynamically for each days array
    arrays.forEach((array, arrayIndex) => {
        const arraySection = document.createElement('div');
        arraySection.className = 'array-section';

        const title = document.createElement('h2');
        title.textContent = array.label;
        arraySection.appendChild(title);

        const dateSection = document.createElement('div');
        dateSection.className = 'date-section';

        const datePicker = document.createElement('input');
        datePicker.type = 'date';
        datePicker.className = 'styled-input';
        datePicker.id = `datePicker-${arrayIndex}`;

        const calculateButton = document.createElement('button');
        calculateButton.className = 'styled-button';
        calculateButton.textContent = `Calculate Dates for ${array.label}`;
        calculateButton.addEventListener('click', () => calculateDates(arrayIndex, array.days));

        dateSection.appendChild(datePicker);
        dateSection.appendChild(calculateButton);

        arraySection.appendChild(dateSection);

        const resultTable = document.createElement('table');
        resultTable.id = `resultTable-${arrayIndex}`;
        resultTable.className = 'styled-table';
        resultTable.innerHTML = `
            <thead>
                <tr>
                    <th>New Date</th>
                </tr>
            </thead>
            <tbody>
                <!-- Results will be appended here -->
            </tbody>
        `;

        arraySection.appendChild(resultTable);
        datePickerContainer.appendChild(arraySection);
    });

    // Function to calculate dates and update the table
    function calculateDates(arrayIndex, days) {
        const datePicker = document.getElementById(`datePicker-${arrayIndex}`);
        const selectedDate = new Date(datePicker.value);

        if (isNaN(selectedDate.getTime())) {
            alert("Please select a valid date.");
            return;
        }

        const resultTableBody = document.querySelector(`#resultTable-${arrayIndex} tbody`);
        resultTableBody.innerHTML = ''; // Clear previous results

        days.forEach(day => {
            const newDate = new Date(selectedDate);
            newDate.setDate(newDate.getDate() + day);

            const row = document.createElement('tr');

            // const originalDateCell = document.createElement('td');
            // originalDateCell.textContent = formatDate(selectedDate);

            // const daysAddedCell = document.createElement('td');
            // daysAddedCell.textContent = day;

            const newDateCell = document.createElement('td');
            newDateCell.textContent = formatDate(newDate);

            // row.appendChild(originalDateCell);
            // row.appendChild(daysAddedCell);
            row.appendChild(newDateCell);

            resultTableBody.appendChild(row);
        });
    }

    // Function to format the date
    function formatDate(date) {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const weekday = date.toLocaleString('default', { weekday: 'long' });
        return `${weekday}, ${day}/${month}/${year}`;
    }
});
