<?php

//Check if we are getting all or one file.
$levelsDir = "../levels/";


if ( $_SERVER['REQUEST_METHOD'] == "POST" ) {
    $file = file_get_contents('php://input');

    if ( file_exists($levelsDir.$file) ) {
        //Remove the level file.
        unlink($levelsDir.$file);

        $files = getFiles($levelsDir);
        die($files);
    } else {
        $files = getFiles($levelsDir);
        die($files);
    }
}

function getFiles( $levelsDir ) {
    $levels = array();
    //Return a list of all levels available.
    if ( $handle = opendir($levelsDir) ) {
        //This is the correct way to loop over the directory.
        while (false !== ($entry = readdir($handle))) {
            if ( $entry != "." && $entry != ".." && $entry != "game.json") {
                //Check if the entry is a json
                $pathInfo = pathinfo($entry);
                if ( $pathInfo["extension"] == "json" ) {
                    $levels[] = array(
                        "file" => $entry,
                        "level_id" => str_replace(array(".json"), "", $entry)
                    );
                }
            }
        }
        closedir($handle);
    }

    if ($levels)
        return json_encode($levels);
    else
        return 0;
}
