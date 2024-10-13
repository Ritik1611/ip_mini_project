<?php
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$dbname = 'se_mini_project';
$username = 'root';
$password = 'Ritikshetty@16';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array('status' => 'error', 'message' => 'Database connection failed')));
}

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);

if ($data === null) {
    die(json_encode(array('status' => 'error', 'message' => 'Invalid JSON input.')));
}

if (!isset($data['names'], $data['password'], $data['division'], $data['roll_no'])) {
    die(json_encode(array('status' => 'error', 'message' => 'Missing required fields.')));
}

$names = $data['names'];
$password = $data['password'];
$division = $data['division'];
$roll_no = $data['roll_no'];

// Query to check if the student exists in the database
$query = "SELECT * FROM students WHERE names = ? AND passwords = ? AND division = ? AND roll_no = ?";
$stmt = $conn->prepare($query);
if ($stmt === false) {
    die(json_encode(array('status' => 'error', 'message' => 'SQL prepare error: ' . $conn->error)));
}

$stmt->bind_param('ssss', $names, $password, $division, $roll_no);
$stmt->execute();
$result = $stmt->get_result();

// Check if the result is valid and fetch data
if ($result && $result->num_rows > 0) {
    $studentData = $result->fetch_assoc(); // Fetch a single result as an associative array
    echo json_encode(array('status' => 'success', 'message' => 'Login successful!', 'data' => $studentData));
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Invalid login credentials. Please check your details.'));
}

$stmt->close();
$conn->close();
?>
