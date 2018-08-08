<?php
require 'config.php';

$targetFile = $targetDir . basename($_FILES['files']['name']);
$error = false;

// Check if file already exists
if (file_exists($targetFile)) {
    $error = 'File already exists';
}

if (move_uploaded_file($_FILES['files']['tmp_name'], $targetFile)) {
    $return = ['success' => true];
} else {
    $error  = 'Something\'s wrong with the upload';
}

if ($error) {
    $return = ['success' => false, 'error' => ['message' => $error]];
}

// Enable CORS
header('Access-Control-Allow-Origin: *');
// Return response
header('Content-Type: application/json');
echo json_encode($return);
