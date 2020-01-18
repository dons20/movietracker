<?php

try {
    if (!file_exists('../../config/index.php')) {
        throw new Exception('Unable to retrieve database config');
    } else {
        require_once '../../config/index.php';
    }
} catch (Exception $e) {
    http_response_code(404);
    echo json_encode(array(
        'error' => array(
            'message' => $e->getMessage()
        ),
    ));
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("This page can only be accessed through a POST request");
}

$client_data = file_get_contents("php://input");
$_POST = json_decode($client_data, true);

$sql = "SELECT * FROM `watched_movies`";

if ($stmt = $pdo->prepare($sql)) {

    // Attempt to execute the prepared statement
    if ($stmt->execute()) {
        $movies = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($movies);
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }

    // Close statement
    unset($stmt);

    // Close connection
    unset($pdo);
}
