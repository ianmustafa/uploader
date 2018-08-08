<?php

if (!function_exists('cachebuster')) {
    function cachebuster($path)
    {
        $filePath = __DIR__ . '/' . $path;
        if (!file_exists($filePath)) {
            return false;
        }

        $mTime = filemtime($filePath);

        return $path . '?m=' . $mTime;
    }
}
