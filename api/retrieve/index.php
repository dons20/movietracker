<?php

require_once '../../config/index.php';

$client_data = file_get_contents("php://input");
$_POST = json_decode($client_data, true);

// Handle empty search variables
if (empty($_POST['id'])) {
    // response code - 400 Bad Request

    http_response_code(400);
    exit("No id provided");
}

$sql = "SELECT * FROM `watched_movies`";

if ($stmt = $pdo->prepare($sql)) {
    // Bind variables to the prepared statement as parameters
    $stmt->bindParam(":id", $param_id);

    // Set parameters
    $param_id = trim($_POST["id"]);

    // Attempt to execute the prepared statement
    if ($stmt->execute()) {
        if ($stmt->rowCount() == 1) {


            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // Retrieve individual field value
            $title = $row["title"];
            $rating = $row["rating"];
            $summary = $row["summary"];
            $image = $row["image"];
            $tags = $row["tags"];
        } else {
            exit("Invalid id supplied");
        }
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }

    // Close statement
    unset($stmt);

    // Close connection
    unset($pdo);
}
