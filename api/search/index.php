<?php

require_once '../../../secure/api_key.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("This page can only be accessed through a POST request");
}

$client_data = file_get_contents("php://input");
$_POST = json_decode($client_data, true);

// Handle empty search variables
if (empty($_POST['query']) && empty($_POST['type'])) {
    // response code - 400 Bad Request

    http_response_code(400);
    exit("No query provided");
}

if ($_POST) {

    // set response code - 200 OK
    http_response_code(200);

    // Check type of search
    if ($_POST['type'] === "title") {
        $page = $_POST['page'];
        $query = $_POST['query'];

        $URL = "https://api.themoviedb.org/3/search/movie?api_key={$api_key}&language=en-US&query={$query}&page={$page}&include_adult=false";
        $curl_response = curlGET($URL);
        echo $curl_response;
    } else if ($_POST['type'] === "keyword") {
        $page = $_POST['page'];
        $query = $_POST['query'];

        $URL = "https://api.themoviedb.org/3/search/keyword?api_key={$api_key}&query={$query}&page={$page}";
        $curl_response = curlGET($URL);
        echo $curl_response;
    } else if ($_POST['type'] === "movie") {
        $movie_id = $_POST['movie_id'];

        $URL = "https://api.themoviedb.org/3/movie/{$movie_id}?api_key={$api_key}&language=en-US";
        $curl_response = curlGET($URL);
        echo $curl_response;
    } else if ($_POST['type'] === "person") {
        $page = $_POST['page'];
        $query = $_POST['query'];

        //TBD requires parsing person IDs and allowing user to choose from options
    } else {
        exit("Unsupported type specified");
    }
}

function curlGET($URL)
{
    $curl = curl_init($URL);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $curl_response = curl_exec($curl);
    if ($curl_response === false) {
        $error = curl_error($curl);
        curl_close($curl);
        die('error occured during curl exec. Additional info: ' . var_export($error));
    }
    curl_close($curl);
    return $curl_response;
}
