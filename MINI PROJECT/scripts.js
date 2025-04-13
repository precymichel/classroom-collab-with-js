// Simulated Data for Assignments and Discussions
const assignments = [
    { title: "Math Homework", dueDate: "2024-10-05" },
    { title: "Science Project", dueDate: "2024-10-12" }
];

const discussions = [
    { user: "Alice", message: "What is the deadline for the science project?" },
    { user: "Bob", message: "Can anyone explain this math problem?" }
];

// Function to load assignments into the page
function loadAssignments() {
    const assignmentList = document.querySelector('.assignment-list');
    assignments.forEach(assignment => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${assignment.title}</strong> - Due: ${assignment.dueDate}`;
        assignmentList.appendChild(div);
    });
}

// Function to load recent discussions
function loadDiscussions() {
    const messages = document.getElementById('messages');
    discussions.forEach(discussion => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${discussion.user}:</strong> ${discussion.message}`;
        messages.appendChild(div);
    });
}

// Add functionality to send a message
document.getElementById('send-message').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value;
    if (messageText.trim()) {
        const messages = document.getElementById('messages');
        const div = document.createElement('div');
        div.innerHTML = `<strong>You:</strong> ${messageText}`;
        messages.appendChild(div);
        messageInput.value = '';
        messages.scrollTop = messages.scrollHeight; // Auto scroll to the bottom
    }
});

// Initialize the page with data
window.onload = function() {
    loadAssignments();
    loadDiscussions();
};
function uploadPDF() {
    const fileInput = document.getElementById('pdfUpload');
    const fileInfo = document.getElementById('file-info');
    const file = fileInput.files[0];

    if (!file) {
        fileInfo.textContent = "No file selected.";
        fileInfo.style.color = "red";
        return;
    }

    if (file.type !== "application/pdf") {
        fileInfo.textContent = "Please upload a PDF file.";
        fileInfo.style.color = "red";
        return;
    }

    fileInfo.textContent = `File Selected: ${file.name}`;
    fileInfo.style.color = "green";

    const formData = new FormData();
    formData.append('assignment', file);

    // Replace with your server upload URL
    const uploadUrl = 'https://your-backend-server.com/upload';

    fetch(uploadUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Assignment submitted successfully!");
        } else {
            alert("Error uploading file.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error uploading file.");
    });
}


// Dark mode toggle functionality
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
// calendar working 
let assignment = [];
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

function renderCalendar() {
    const calendarDays = document.getElementById('calendar-days');
    const currentMonthDisplay = document.getElementById('current-month');
    
    // Set month title
    currentMonthDisplay.innerText = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Clear previous days
    calendarDays.innerHTML = '';
    
    // Get first day and last date of the month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add blank spaces for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
        const blankDay = document.createElement('div');
        calendarDays.appendChild(blankDay);
    }
    
    // Add actual days of the month
    for (let day = 1; day <= lastDate; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.innerText = day;

        // Highlight days with assignments
        const assignmentOnDay = assignments.some(assignment => new Date(assignment.date).getDate() === day &&
                                                                new Date(assignment.date).getMonth() === currentMonth &&
                                                                new Date(assignment.date).getFullYear() === currentYear);
        if (assignmentOnDay) {
            dayDiv.style.backgroundColor = '#FFD700';
        }

        calendarDays.appendChild(dayDiv);
    }
}

function addAssignment() {
    const title = document.getElementById('assignment-title').value;
    const date = document.getElementById('assignment-date').value;
    
    if (title && date) {
        assignments.push({ title, date });
        document.getElementById('assignment-title').value = '';
        document.getElementById('assignment-date').value = '';
        renderAssignments();
        renderCalendar();
    } else {
        alert('Please fill in both fields');
    }
}

function renderAssignments() {
    const assignmentList = document.getElementById('assignment-list');
    assignmentList.innerHTML = '';
    
    assignments.forEach((assignment, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${assignment.title} - ${new Date(assignment.date).toLocaleDateString()}`;
        assignmentList.appendChild(listItem);
    });
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

window.onload = function() {
    renderCalendar();
}
