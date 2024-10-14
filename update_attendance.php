<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db_connection.php';

$postData = json_decode(file_get_contents('php://input'), true);
$division = $postData['division'];
$date = $postData['date'];
$subject = $postData['subject'];
$attendanceData = json_encode($postData['attendanceData']);

// Query to update attendance for the selected date
$query = "UPDATE attendance SET attendance = '$attendanceData', subject = '$subject' WHERE division = '$division' AND date = '$date'";
if (mysqli_query($conn, $query)) {
    echo json_encode(['message' => 'Attendance updated successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to update attendance']);
}
?>
