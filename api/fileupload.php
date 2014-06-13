<?php
if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
    $spritesDir = "../graphics/sprites/";
    $soundsDir = "../sounds/";
    $files = reArrayFiles($_FILES['asset_files']);

    foreach ( $files as $file ) {
        if ( $_POST["imagetype"] == "sprite" ) {
            //Move the file to the graphics folder.
            $target = $spritesDir . basename($file["name"]);
        } else if ( $_POST["imagetype"] == "sound" ) {
            $target = $soundsDir . basename($file["name"]);
        }

        move_uploaded_file($file["tmp_name"], $target);
    }

    header("Location: /");
}

function reArrayFiles(&$file_post) {

    $file_ary = array();
    $file_count = count($file_post['name']);
    $file_keys = array_keys($file_post);

    for ($i=0; $i<$file_count; $i++) {
        foreach ($file_keys as $key) {
            $file_ary[$i][$key] = $file_post[$key][$i];
        }
    }

    return $file_ary;
}
