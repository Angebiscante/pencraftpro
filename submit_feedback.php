<?php
// Database connection parameters
$host = "localhost";  // Changed from $servername to $host to match the connection string
$dbname = "pencraft_db";
$username = "root";
$password = "";

try {
    // Create database connection
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get form data
    $name = $_POST['userName'];
    $email = $_POST['userEmail'];
    $comment = $_POST['userComment'];
    
    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO feedback (name, email, comment) VALUES (:name, :email, :comment)");
    
    // Bind parameters
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':comment', $comment);
    
    // Execute the statement
    $stmt->execute();
    
    // Redirect back to index page with success message
    header("Location: index.html?status=success");
    exit();
    
} catch(PDOException $e) {
    // Redirect back to index page with error message
    header("Location: index.html?status=error");
    exit();
}
?> 