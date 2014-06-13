window.angular.module('ngale.controllers.aleController', [])
    .controller('ALEController', [ '$scope', '$http',
        function( $scope, $http ) {
            $scope.game = {};

            $scope.SaveGame = function() {
                //Call the api to save game.
                $http({ method: "POST", url: "api/game.php", data: $scope.game })
                    .success(function( data, status, headers, config ) {
                    });
            };
        }]);
