<?php

define('_DEFVAR', 1);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("This page can only be accessed through a POST request");
}

require_once '../app_root.php';

try {
    if (!file_exists("{$root}/secure/api_key.php")) {
        throw new Exception('Unable to access API');
    } else {
        require_once "{$root}/secure/api_key.php";
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

// set response code - 200 OK
http_response_code(200);

// Check type of search
$URL = "https://api.themoviedb.org/3/discover/movie?api_key={$api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
$curl_response = curlGET($URL);
echo $curl_response;

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
