<?php
// Database connection
$servername = "localhost"; 
$username = "root"; 
$password = "Ritikshetty@16"; 
$dbname = "se_mini_project"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true); // Get JSON data
    $username = $data['username'];
    $password = $data['password'];
    $email = $data['email'];

    $stmt = $conn->prepare("SELECT * FROM login_credentials WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Username already exists.']);
    } else {
        $stmt = $conn->prepare("INSERT INTO login_credentials (username, pass, email) VALUES (?, ?, ?)");
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt->bind_param("sss", $username, $hashed_password, $email);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Registration successful!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error occurred during registration.']);
        }
    }

    $stmt->close();
}

$conn->close();
?>
