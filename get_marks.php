<?php
header('Content-Type: application/json');

include 'db_connection.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($conn->connect_error) {
    die(json_encode(array('status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error)));
}

if (!isset($_GET['roll_no'], $_GET['division'])) {
    die(json_encode(array('status' => 'error', 'message' => 'Roll number and division are required.')));
}

$roll_no = $_GET['roll_no'];
$division = $_GET['division'];

$query = "SELECT subjects AS subject, marks FROM marks WHERE roll_no = ? AND division = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $roll_no, $division);
$stmt->execute();
$result = $stmt->get_result();

$marksData = [];
while ($row = $result->fetch_assoc()) {
    $marksData[] = $row;
}

echo json_encode(array('status' => 'success', 'marks' => $marksData));

$stmt->close();
$conn->close();
?>
