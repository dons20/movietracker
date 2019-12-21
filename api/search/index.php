<?php

require_once '../../../secure/api_key.php';
//header("Access-Control-Allow-Origin: *");

$client_data = file_get_contents("php://input");
$_POST = json_decode($client_data, true);

// Handle empty search variables
if (empty($_POST['query']) || empty($_POST['type'])) {
    // response code - 400 Bad Request

    http_response_code(400);
    exit("No query provided");
}

if ($_POST) {

    // set response code - 200 OK
    http_response_code(200);

    $query = $_POST['query'];
    $page = $_POST['page'];

    // Check type of search
    if ($_POST['type'] === "title") {
    } else if ($_POST['type'] == "keyword") {
        $URL = "https://api.themoviedb.org/3/search/keyword?api_key=" . $api_key . "&query=" . $query . "&page=" . $page . "/";
        $curl_response = curlGET($URL);
        //$decoded = json_decode($curl_response); 

        echo $curl_response;
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
