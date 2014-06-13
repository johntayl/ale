<?php

//Edit and get the info from the game.json file.

if ( $_SERVER["REQUEST_METHOD"] == "GET" ) {
    //Get info

    getGameFile();
} else {
    //Post info.
    saveGameData();
}


//Return the game data.
function getGameFile() {
    $levelsDir = "../levels";
    //Get the level file contents.
    if ( file_exists($levelsDir."/game.json") ) {
        $fh = fopen($levelsDir."/game.json", 'r');

        $fileData = fread($fh, filesize($levelsDir."/game.json"));

        fclose($fh);

        die($fileData);
    }
}

function saveGameData() {
    //Take the data
    $levelsDir = "../levels";
    $entityBody = file_get_contents('php://input');

    $game = json_decode($entityBody);
    $game->levels = array();

    $files = array();

    //Return a list of all levels available.
    if ( $handle = opendir($levelsDir) ) {
        //This is the correct way to loop over the directory.
        while (false !== ($entry = readdir($handle))) {
            if ( $entry != "." && $entry != ".." && $entry != "game.json" && $entry != ".DS_Store") {
                //Check if the entry is a json
                $files[] = $entry;
                // $pathInfo = pathinfo($entry);
                // $levelIndex = str_replace(array("level", ".json"), "", $entry) - 1;
                // if ( $pathInfo["extension"] == "json" ) {
                //     //Read the file and put it into the game levels array.
                //     $jsonFileData = file_get_contents($levelsDir."/".$entry);
                //     $fileData = json_decode($jsonFileData);

                //     $game->levels[] = $fileData;
                // }
            }
        }
        closedir($handle);

        //order the files.
        natsort($files);

        foreach($files as $file) {
            $pathInfo = pathinfo($file);
            $levelIndex = str_replace(array("level",".json"), "", $file) - 1;
            if ( $pathInfo["extension"] == "json" ) {
                //Read the file and put it into the game levels array.
                $jsonFileData = file_get_contents($levelsDir."/".$file);
                $fileData = json_decode($jsonFileData);

                $game->levels[] = $fileData;
            }
        }
    }

    $gameData = json_encode($game);

    //Save this data to the game file.
    $gameFH = fopen($levelsDir."/game.json", 'w');

    fwrite($gameFH, $gameData);

    fclose($gameFH);

    die(1);
}
