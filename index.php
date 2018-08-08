<?php

if (!file_exists('config.php')) {
    echo '<h1>Error!</h1><p><code>config.php</code> doesn\'t exists!</p>' .
    '<p>Please create one by duplicating <code>config.example.php</code>.</p>';
    exit(1);
}

// As simple as that 😊
require 'config.php';
require 'helpers.php';
require 'view.php';
