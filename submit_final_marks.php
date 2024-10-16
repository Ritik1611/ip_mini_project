<?php
include 'db_connection.php';


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$division = $data['division'];
$subject = $data['subject'];
$marks = $data['marks']; 

$insertQuery = "INSERT INTO marks (division, subjects, roll_number, marks) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($insertQuery);

if ($stmt) {
    foreach ($marks as $rollNumber => $mark) {
        $stmt->bind_param("sssi", $division, $subject, $rollNumber, $mark);
        $stmt->execute();
    }
    echo json_encode(["status" => "success", "message" => "Marks updated successfully."]);
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Error preparing statement: " . $conn->error]);
}

$conn->close();
?>
