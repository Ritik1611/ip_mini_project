<?php
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");

require('db_connection.php');

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true); 
    $username = $data['username'];
    $password = $data['password'];

    $stmt = $conn->prepare("SELECT pass FROM login_credentials WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hashed_password = $row['pass'];

        if (password_verify($password, $hashed_password)) {
            echo json_encode(['status' => 'success', 'message' => 'Login successful!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid password.']);
        }
    } else {
        // User not found
        echo json_encode(['status' => 'error', 'message' => 'Username not found.']);
    }

    $stmt->close();
}

$conn->close();
?>
