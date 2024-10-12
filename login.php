<?php
// Database connection
$servername = "localhost"; // Replace with your server name
$username = "root"; // Replace with your database username
$password = "Ritikshetty@16"; // Replace with your database password
$dbname = "se_mini_project"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true); // Get JSON data
    $username = $data['username'];
    $password = $data['password'];

    // Prepare statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT pass FROM login_credentials WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User found, now verify password
        $row = $result->fetch_assoc();
        $hashed_password = $row['pass'];

        if (password_verify($password, $hashed_password)) {
            // Password is correct
            echo json_encode(['status' => 'success', 'message' => 'Login successful!']);
        } else {
            // Incorrect password
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
