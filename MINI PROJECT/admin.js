// script.js

// Function to add a teacher to the list
function addTeacher() {
    const teacherName = document.getElementById("teacherName").value;
    if (teacherName) {
        const teacherList = document.getElementById("teacherList");
        const listItem = document.createElement("li");
        listItem.textContent = teacherName;
        teacherList.appendChild(listItem);
        document.getElementById("teacherName").value = ""; // Clear the input
    } else {
        alert("Please enter a teacher's name.");
    }
}

// Function to add a student to the list
function addStudent() {
    const studentName = document.getElementById("studentName").value;
    if (studentName) {
        const studentList = document.getElementById("studentList");
        const listItem = document.createElement("li");
        listItem.textContent = studentName;
        studentList.appendChild(listItem);
        document.getElementById("studentName").value = ""; // Clear the input
    } else {
        alert("Please enter a student's name.");
    }
}
