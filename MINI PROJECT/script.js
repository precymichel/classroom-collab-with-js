// Attendance Generator
document.getElementById('attendanceForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const studentName = document.getElementById('studentName').value;

    // Create a new list item for the attendance
    const li = document.createElement('li');
    li.textContent = studentName;
    document.getElementById('attendanceList').appendChild(li);

    // Clear the input field
    document.getElementById('studentName').value = '';
});

// Polls and Surveys
let pollData = {
    'Essay': 0,
    'Project': 0,
    'Presentation': 0,
    'Quiz': 0
};

// Initialize the chart
let ctx = document.getElementById('pollChart').getContext('2d');
let pollChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: Object.keys(pollData),
        datasets: [{
            label: '# of Votes',
            data: Object.values(pollData),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Function to handle voting
function vote(option) {
    if (pollData[option] !== undefined) {
        // Increment the vote count for the selected option
        pollData[option]++;
        // Update the chart data
        pollChart.data.datasets[0].data = Object.values(pollData);
        pollChart.update();
    }
}
