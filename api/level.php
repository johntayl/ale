<?php

//Save the level files in the levels dir.
$levelsDir = "../levels";

if ( $_SERVER["REQUEST_METHOD"] == "POST" ) {
    //Posting level data.
    $entityBody = file_get_contents('php://input');
    $input = json_decode($entityBody);

    $levelName = $input->level;
    $levelData = $input->levelData;

    if ( !$levelData ) {
        $defaultJson = array(
            "theme"=> array(
                "song" => null,
                "loop" => 0
            ),
            "sprites" => array(),
            //16x12 grid. 64x64 pixels.
            "map" => array(
                array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
                array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
                array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
                array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
                array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
                array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
                array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
                array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
                array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
                array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
                array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
                array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
            )
        );

        $levelData = $defaultJson;
    }

    //Create/Modify JSON file.
    $jsonLevelData = json_encode($levelData);

    //Overwrite the file.
    $fh = fopen($levelsDir."/".$levelName.".json", 'w');

    fwrite($fh, $jsonLevelData);

    fclose($fh);

    $files = getFiles($levelsDir);

    die($files);
} else {
    //GET request
    $level = null;
    //Check if we are getting all or one file.
    if ( isset($_GET["level"]) ) {
        $level = $_GET["level"];
    }

    if ( $level ) {
        //Get the level file contents.
        if ( file_exists($levelsDir."/".$level.".json") ) {
            $fh = fopen($levelsDir."/".$level.".json", 'r');

            $fileData = fread($fh, filesize($levelsDir."/".$level.".json"));

            fclose($fh);

            die($fileData);
        } else {
            die(0);
        }
    } else {
        $files = getFiles($levelsDir);
        die($files);
    }
}

function getFiles( $levelsDir ) {
    //Return a list of all levels available.
    $levels = array();
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
    return 0;
}
