<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$dbname = 'se_mini_project';
$username = 'root';
$password = 'Ritikshetty@16';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array('status' => 'error', 'message' => 'Database connection failed')));
}

// Decode the incoming JSON data
$data = json_decode(file_get_contents('php://input'), true);

// Check if data is properly decoded
if (is_null($data)) {
    die(json_encode(array('status' => 'error', 'message' => 'Invalid JSON data received')));
}

// Validate required fields
if (!isset($data['subject'], $data['attendanceData'], $data['division'])) {
    die(json_encode(array('status' => 'error', 'message' => 'Missing required fields')));
}

$subject = $data['subject'];
$attendanceData = $data['attendanceData'];
$division = $data['division'];

// Prepare the SQL statement
$stmt = $conn->prepare("INSERT INTO attendance (roll_no, division, attendance_date, attendance_status, subjects) VALUES (?, ?, ?, ?, ?)");

if (!$stmt) {
    die(json_encode(array('status' => 'error', 'message' => 'Failed to prepare statement')));
}

foreach ($attendanceData as $rollNumber => $status) {
    $attendance_date = date('Y-m-d');

    $stmt->bind_param("sssss", $rollNumber, $division, $attendance_date, $status, $subject);
    
    if (!$stmt->execute()) {
        die(json_encode(array('status' => 'error', 'message' => 'Execution failed: ' . $stmt->error)));
    }
}

// Close the statement and connection
$stmt->close();
$conn->close();

// Return a success response
echo json_encode(array('status' => 'success', 'message' => 'Attendance submitted.'));
?>
