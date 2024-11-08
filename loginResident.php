<?php
// Start session to store user session data
session_start();

// Database connection details
$servername = "localhost";
$username = "root";  // Default for XAMPP
$password = "";      // Default for XAMPP
$dbname = "hoa_management";

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if the connection is successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve the submitted username and password
$lot_number = $_POST['username'];
$password = $_POST['password'];

// Prepare SQL statement to retrieve the user with the provided lot number
$sql = "SELECT * FROM residents WHERE lot_number = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $lot_number);
$stmt->execute();
$result = $stmt->get_result();

// Check if user exists
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Verify the password
    if (password_verify($password, $user['password'])) {
        // Store user information in session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['full_name'] = $user['full_name'];
        
        // Redirect to the resident dashboard page
        header("Location: ResidentModule.html");
        exit();
    } else {
        // Invalid password
        echo "Invalid password. <a href='loginResident.html'>Try again</a>.";
    }
} else {
    // User not found
    echo "User not found. <a href='loginResident.html'>Try again</a>.";
}

// Close connection
$stmt->close();
$conn->close();
?>
