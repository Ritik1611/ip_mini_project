<?php
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$dbname = 'se_mini_project';
$username = 'root';
$password = 'Ritikshetty@16';

$conn = new mysqli($host, $username, $passwords, $dbname);

if ($conn->connect_error) {
    die(json_encode(array('status' => 'error', 'message' => 'Database connection failed')));
}

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];
$division = $data['division'];
$rollNumber = $data['rollNumber'];

// Query to check if the student exists in the database
$query = "SELECT * FROM students WHERE username = ? AND password = ? AND division = ? AND roll_number = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('ssss', $username, $password, $division, $rollNumber);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Student exists
    echo json_encode(array('status' => 'success', 'message' => 'Login successful!'));
} else {
    // Student doesn't exist or invalid credentials
    echo json_encode(array('status' => 'error', 'message' => 'Invalid login credentials. Please check your details.'));
}

$stmt->close();
$conn->close();
?>