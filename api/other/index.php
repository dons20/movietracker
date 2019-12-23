<?php

require_once '../../../secure/api_key.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("This page can only be accessed through a POST request");
}

$client_data = file_get_contents("php://input");
$_POST = json_decode($client_data, true);

// Handle empty search variables
if (empty($_POST['type'])) {
    // response code - 400 Bad Request

    http_response_code(400);
    exit("No type specified");
}

if ($_POST) {

    // set response code - 200 OK
    http_response_code(200);

    $type = $_POST['type'];

    // Check type of search
    if ($_POST['type'] === "config") {
        $URL = "https://api.themoviedb.org/3/configuration?api_key={$api_key}";
        $curl_response = curlGET($URL);
        echo $curl_response;
    } else if ($_POST['type'] == "genres") {
        $URL = "https://api.themoviedb.org/3/genre/movie/list?api_key={$api_key}&language=en-US";
        $curl_response = curlGET($URL);
        echo $curl_response;
    } else {
        exit("Unsupported Type Specified");
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
