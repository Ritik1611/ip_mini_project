<?php
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");

require('db_connection.php');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO students (names, division, roll_no, passwords) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssis", $student_name, $student_division, $student_rollno, $student_password);

// Set parameters and execute
$student_name = $_POST['student-name'];
$student_division = $_POST['student-division'];
$student_rollno = $_POST['student-rollno'];
$student_password = $_POST['student-password']; 

if ($stmt->execute()) {
    echo "New student added successfully!";
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>
