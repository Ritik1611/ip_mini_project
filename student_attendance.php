<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require 'db_connection.php'; // include database connection

$data = json_decode(file_get_contents('php://input'), true);

$roll_no = $data['roll_no'] ?? '';
$division = $data['division'] ?? '';

if ($roll_no && $division) {
    // Query to fetch attendance
    $query = $conn->prepare("SELECT subjects, COUNT(attendance_status) as total_classes, 
                             SUM(CASE WHEN attendance_status = 'Present' THEN 1 ELSE 0 END) as attended_classes
                             FROM attendance
                             WHERE roll_no = ? AND division = ?
                             GROUP BY subjects");

    $query->bind_param('is', $roll_no, $division);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows > 0) {
        $attendance_data = [];
        while ($row = $result->fetch_assoc()) {
            $attendance_data[] = [
                'subjects' => $row['subjects'],
                'total_classes' => $row['total_classes'],
                'attended_classes' => $row['attended_classes']
            ];
        }
        echo json_encode(['status' => 'success', 'attendance' => $attendance_data]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No attendance data found.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid roll number or division.']);
}
?>
