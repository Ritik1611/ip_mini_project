<?php
require('db_connection.php');

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($conn->connect_error) {
    die(json_encode(array('status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error)));
}

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

$query = "SELECT student_id, names, division, roll_no FROM students WHERE names = ? AND passwords = ? AND division = ? AND roll_no = ?";
$stmt = $conn->prepare($query);

if ($stmt === false) {
    die(json_encode(array('status' => 'error', 'message' => 'SQL prepare error: ' . $conn->error)));
}

$stmt->bind_param('ssss', $names, $password, $division, $roll_no);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $studentData = $result->fetch_assoc();
    echo json_encode(array(
        'status' => 'success',
        'message' => 'Login successful!',
        'data' => array(
            'student_id' => $studentData['student_id'],
            'names' => $studentData['names'],
            'division' => $studentData['division'],
            'roll_no' => $studentData['roll_no']
        )
    ));
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Invalid login credentials. Please check your details.'));
}

$stmt->close();
$conn->close();
?>
