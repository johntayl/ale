window.angular.module('ngale.controllers.levelManagerController', [])
    .controller('LevelManagerController', [ '$scope', '$http',
        function( $scope, $http ) {

            $scope.levels = [];
            $scope.newLevel = "";

            $scope.Init = function() {
                //Call the ajax file to read all the files.
                $http({ method: "GET", url: 'api/game.php'})
                    .success( function( data, status, headers, config ) {
                        $scope.game = data;
                    });

                $http({method: 'GET', url: 'api/level.php', data: {}})
                    .success(function( data, status, headers, config ) {
                        if ( !data ) {
                            $scope.levels = [];
                        } else {
                            $scope.levels = data;
                        }
                    });
            };

            $scope.NewLevel = function() {

                $http({method: "POST", url: 'api/level.php', data: { level: $scope.newLevel, levelData: $scope.levels }})
                    .success(function( data, status, headers, config ) {
                        $scope.newLevel = "";
                        $scope.levels = data;
                    });
            };

            $scope.DeleteLevel = function( file ) {
                //Confirm delete
                if ( confirm("Are you sure you want to delete '"+file+"'?") ) {
                    //Remove level.
                    $http({method: "POST", url: 'api/deleteLevel.php', data: file})
                        .success( function( data, status, headers, config ) {
                            $scope.levels = data;
                        });
                }
            };
        }]);
