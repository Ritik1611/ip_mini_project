<?php
include 'db_connection.php';

$postData = json_decode(file_get_contents('php://input'), true);
$division = $postData['division'];
$date = $postData['date'];
$subject = $postData['subject'];
$roll_no = $postData['roll_no'];
$attendance_status = $postData['attendance_status'];

$query = "UPDATE attendance SET attendance_status = '$attendance_status' WHERE division = '$division' AND subjects = '$subject' AND attendance_date = '$date' AND roll_no = '$roll_no'";
if (mysqli_query($conn, $query)) {
    echo json_encode(['message' => 'Attendance updated successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to update attendance']);
}
?>
