<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require('db_connection.php');

// Check for connection errors
if ($conn->connect_error) {
    die(json_encode(array('status' => 'error', 'message' => 'Database connection failed')));
}

// Get the division from the query string
$division = isset($_GET['division']) ? $conn->real_escape_string($_GET['division']) : '';

// Prepare the SQL query to get roll numbers based on the division
$query = "SELECT roll_no FROM students WHERE division = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $division);
$stmt->execute();
$result = $stmt->get_result();

// Fetch the roll numbers
$rollNumbers = [];
while ($row = $result->fetch_assoc()) {
    $rollNumbers[] = $row['roll_no'];
}

// Close the statement and connection
$stmt->close();
$conn->close();

// Return the roll numbers as JSON
echo json_encode($rollNumbers);
?>
