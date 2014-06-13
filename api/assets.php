<?php

//Returns a list of all files in a JSON format from the 'assets' folder.
$spritesDir = "../graphics/sprites";
$soundsDir = "../sounds";
$sprites = array();
$sounds   = array();

if ( $handle = opendir($spritesDir) ) {
    //This is the correct way to loop over the directory.
    while (false !== ($entry = readdir($handle))) {
        if ( $entry != "." && $entry != "..") {
            //Check if the entry is a jpeg/png/gif
            $pathInfo = pathinfo($entry);
            if ( $pathInfo["extension"] == "png"
                || $pathInfo["extension"] == "jpg"
                || $pathInfo["extension"] == "jpeg"
                || $pathInfo["extension"] == "gif" ) {
                $sprites[] = "graphics/sprites/" . $entry;
            }
        }
    }

    closedir($handle);
}

if ( $handle = opendir($soundsDir) ) {
    //This is the correct way to loop over the directory.
    while (false !== ($entry = readdir($handle))) {
        if ( $entry != "." && $entry != "..") {
            //Check if the entry is a mp3
            $pathInfo = pathinfo($entry);
            if ( $pathInfo["extension"] == "mp3" || $pathInfo["extension"] == "ogg" ) {
                $sounds[] = "sounds/" . $entry;
            }
        }
    }

    closedir($handle);
}

$assets = array(
    "sprites" => $sprites,
    "sounds" => $sounds
);

die(json_encode($assets));
