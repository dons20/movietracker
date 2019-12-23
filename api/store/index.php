<?php

require_once '../../config/index.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("This page can only be accessed through a POST request");
}

$client_data = file_get_contents("php://input");
$_POST = json_decode($client_data, true);

$id = $title = $rating = $date = $image = "";
$id_err = $title_err = $rating_err = $date_err = $image_err = "";

$input_id = trim($_POST["id"]);

if (empty($input_id)) {
    $id_err = "No ID supplied";
    http_response_code(406);
    exit($id_err);
} else if (!ctype_digit($input_id)) {
    $id_err = "Invalid ID number supplied";
    http_response_code(406);
    exit($id_err);
} else {
    $id = $input_id;
}

$input_title = trim($_POST["title"]);

if (empty($input_title)) {
    $title_err = "No title specified";
    http_response_code(406);
    exit($title_err);
} else {
    $title = $input_title;
}

$input_rating = trim($_POST["rating"]);

if (empty($input_rating)) {
    $rating_err = "No rating specified";
    http_response_code(406);
    exit($rating_err);
} else {
    $rating = $input_rating;
}

$input_date = trim($_POST["date"]);

if (empty($input_date)) {
    $date_err = "No date specified";
    http_response_code(406);
    exit($date_err);
} else {
    $date = $input_date;
}

$input_image = trim($_POST["image"]);

if (empty($input_image)) {
    $image_err = "No image specified";
    http_response_code(406);
    exit($image_err);
} else {
    $image = $input_image;
}



if (empty($id_err) && empty($title_err) && empty($rating_err) && empty($date_err) && empty($image_err)) {
    $sql = "INSERT INTO watched_movies (id, title, rating, date, image) VALUES (:id, :title, :rating, :date, :image)";

    if ($stmt = $pdo->prepare($sql)) {
        $stmt->bindParam(":id", $param_id);
        $stmt->bindParam(":title", $param_title);
        $stmt->bindParam(":rating", $param_rating);
        $stmt->bindParam(":date", $param_date);
        $stmt->bindParam(":image", $param_image);

        $param_id = $id;
        $param_title = $title;
        $param_rating = $rating;
        $param_date = $date;
        $param_image = $image;

        if ($stmt->execute()) {
            http_response_code(200);
            exit();
        } else {
            http_response_code(500);
            exit('Request failed, check inserted data');
        }
    }

    unset($stmt);
}

unset($pdo);
