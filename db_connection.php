<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$dbname = 'se_mini_project';
$username = 'root';
$password = 'Ritikshetty@16';

// Create a connection to the database
$conn = new mysqli($host, $username, $password, $dbname);
?>