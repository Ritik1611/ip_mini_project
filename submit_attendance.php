<?php
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require('db_connection.php');

if ($conn->connect_error) {
    die(json_encode(array('status' => 'error', 'message' => 'Database connection failed')));
}

$data = json_decode(file_get_contents('php://input'), true);

if (is_null($data)) {
    die(json_encode(array('status' => 'error', 'message' => 'Invalid JSON data received')));
}

if (!isset($data['subject'], $data['attendanceData'], $data['division'])) {
    die(json_encode(array('status' => 'error', 'message' => 'Missing required fields')));
}

$subject = $data['subject'];
$attendanceData = $data['attendanceData'];
$division = $data['division'];

$stmt = $conn->prepare("INSERT INTO attendance (roll_no, division, attendance_date, attendance_status, subjects) VALUES (?, ?, ?, ?, ?)");

if (!$stmt) {
    die(json_encode(array('status' => 'error', 'message' => 'Failed to prepare statement')));
}

foreach ($attendanceData as $rollNumber => $status) {
    $attendance_date = date('Y-m-d');
    
    // Bind the parameters inside the loop to ensure it gets updated for each roll number
    $stmt->bind_param("sssss", $rollNumber, $division, $attendance_date, $status, $subject);

    if (!$stmt->execute()) {
        error_log("SQL Error: " . $stmt->error); // Log the error for debugging
        die(json_encode(array('status' => 'error', 'message' => 'Execution failed: ' . $stmt->error)));
    }
}

// Close the statement and connection
$stmt->close();
$conn->close();

echo json_encode(array('status' => 'success', 'message' => 'Attendance submitted.'));
?>
