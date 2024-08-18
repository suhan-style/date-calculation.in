document.addEventListener('DOMContentLoaded', function() {
    const cumulativeDatePickerContainer = document.getElementById('cumulative-date-picker-container');
    const arrays = [
        { label: "Array 1", days: [1095, 1095, 1460] },
        { label: "Array 2", days: [90, 90, 120] },
        { label: "Array 3", days: [90, 90, 120] }
        // Add more arrays as needed
    ];

    // Create date picker sections dynamically for each days array
    arrays.forEach((array, arrayIndex) => {
        createCumulativeDatePickerSection(array, arrayIndex);
    });

    // Function to create date picker sections
    function createCumulativeDatePickerSection(array, arrayIndex) {
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
        datePicker.id = `cumulativeDatePicker-${arrayIndex}`;

        const calculateButton = document.createElement('button');
        calculateButton.className = 'styled-button';
        calculateButton.textContent = `Calculate Cumulative Dates for ${array.label}`;
        calculateButton.addEventListener('click', () => calculateCumulativeDates(arrayIndex, array.days));

        dateSection.appendChild(datePicker);
        dateSection.appendChild(calculateButton);

        arraySection.appendChild(dateSection);

        const resultTable = document.createElement('table');
        resultTable.id = `cumulativeResultTable-${arrayIndex}`;
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
        cumulativeDatePickerContainer.appendChild(arraySection);
    }

    // Function to calculate cumulative dates and update the table
    function calculateCumulativeDates(arrayIndex, days) {
        const datePicker = document.getElementById(`cumulativeDatePicker-${arrayIndex}`);
        const selectedDate = new Date(datePicker.value);

        if (isNaN(selectedDate.getTime())) {
            alert("Please select a valid date.");
            return;
        }

        const resultTableBody = document.querySelector(`#cumulativeResultTable-${arrayIndex} tbody`);
        resultTableBody.innerHTML = ''; // Clear previous results

        let currentDate = new Date(selectedDate);
        days.forEach(day => {
            currentDate.setDate(currentDate.getDate() + day);

            const row = document.createElement('tr');

            const newDateCell = document.createElement('td');
            newDateCell.textContent = formatDate(currentDate);

            row.appendChild(newDateCell);

            resultTableBody.appendChild(row);

            // Update selectedDate for the next iteration
            selectedDate.setDate(selectedDate.getDate() + day);
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
