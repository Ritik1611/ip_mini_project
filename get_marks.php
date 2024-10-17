<?php
header('Content-Type: application/json');

include 'db_connection.php';

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed.']));
}

$data = json_decode(file_get_contents("php://input"));

$roll_no = $data->roll_no;
$division = $data->division;

if (empty($roll_no) || empty($division)) {
    echo json_encode(['status' => 'error', 'message' => 'Roll number and division are required.']);
    exit();
}

// SQL query to get marks
$sql = "SELECT subjects, marks FROM marks WHERE roll_number = ? AND division = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $roll_no, $division);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $marks_data = [];
    while ($row = $result->fetch_assoc()) {
        $marks_data[] = $row;
    }
    echo json_encode(['status' => 'success', 'marks' => $marks_data]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No marks found for the given roll number and division.']);
}

$stmt->close();
$conn->close();
?>
