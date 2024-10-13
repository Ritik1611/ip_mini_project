<?php
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = 'localhost';
$dbname = 'se_mini_project';
$username = 'root';
$password = 'Ritikshetty@16';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array('status' => 'error', 'message' => 'Database connection failed')));
}

$data = json_decode(file_get_contents('php://input'), true);

if ($data === null) {
    die(json_encode(array('status' => 'error', 'message' => 'Invalid JSON input.')));
}

if (!isset($data['username'], $data['password'], $data['division'], $data['rollNumber'])) {
    die(json_encode(array('status' => 'error', 'message' => 'Missing required fields.')));
}

$username = $data['username'];
$password = $data['password'];
$division = $data['division'];
$rollNumber = $data['rollNumber'];

// Query to check if the student exists in the database
$query = "SELECT * FROM students WHERE names = ? AND passwords = ? AND division = ? AND roll_number = ?";
$stmt = $conn->prepare($query);
if ($stmt === false) {
    die(json_encode(array('status' => 'error', 'message' => 'SQL prepare error: ' . $conn->error)));
}

$stmt->bind_param('ssss', $username, $password, $division, $rollNumber);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(array('status' => 'success', 'message' => 'Login successful!'));
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Invalid login credentials. Please check your details.'));
}

$stmt->close();
$conn->close();
?>
