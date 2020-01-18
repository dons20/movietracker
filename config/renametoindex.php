<?php

$pdo = null;
$localFileCheck = 'devserver';

//For local development
//create a blank file simply called devserver (or change localFileCheck to whatever you'd like)
//Replace YOUR_X with the appropriate values
if (file_exists("../../{$localFileCheck}")) {
    define('DB_SERVER', 'YOUR_DB_SERVER_HOST');
    define('DB_USERNAME', 'YOUR_DB_USERNAME');
    define('DB_PASSWORD', 'YOUR_DB_PASSWORD');
    define('DB_NAME', 'YOUR_DB_NAME');

    //Attempt connection to Database
    try {
        $GLOBALS['pdo'] = new PDO("mysql:host=" . DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
        $GLOBALS['pdo']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //Check connection
    } catch (PDOException $e) {
        http_response_code(400);
        echo json_encode(array(
            'error' => array(
                'message' => $e->getMessage()
            ),
        ));
        die();
    }

    //For live server
    //Replace LIVE_X with the appropriate values
} else {
    define('DB_SERVER', 'LIVE_DB_SERVER_HOST');
    define('DB_USERNAME', 'LIVE_DB_USERNAME');
    define('DB_PASSWORD', 'LIVE_DB_PASSWORD');
    define('DB_NAME', 'LIVE_DB_NAME');

    //Attempt connection to Database
    try {
        $GLOBALS['pdo'] = new PDO("mysql:host=" . DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
        $GLOBALS['pdo']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //Check connection
    } catch (PDOException $e) {
        http_response_code(400);
        echo json_encode(array(
            'error' => array(
                'message' => $e->getMessage()
            ),
        ));
        die();
    }
}
