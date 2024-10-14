<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db_connection.php';

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$division = $_GET['division'];  
$subject = $_GET['subject'];  
$date = $_GET['date'];  

$sql = "SELECT roll_no, attendance_status FROM attendance WHERE division='$division' AND subjects='$subject' AND attendance_date='$date'";
$result = $conn->query($sql);

$attendanceData = [];

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $attendanceData[] = $row;
  }
}

echo json_encode($attendanceData);
$conn->close();
?>
