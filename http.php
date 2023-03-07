<?php
require_once "vendor/autoload.php";

use GuzzleHttp\Client;

$client = new Client([
    // Base URI is used with relative requests
    'base_uri' => 'http://localhost:9900',
]);

$response = $client->request('POST', '/api/signup', [
    'name' => 'John'
]);

$body = $response->getBody();
$arr_body = json_decode($body);
print_r($arr_body);
