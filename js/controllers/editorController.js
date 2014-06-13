window.angular.module('ngale.controllers.editorController', [])
  .controller('EditorController', [ '$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
      $scope.selectedLayer = "background";
      $scope.selectedAsset = null;
      $scope.selectedGraphic = null;
      $scope.selectedColor = null;

      $scope.level = $routeParams.level;

      //Files from the file reader.
      $scope.assets = {
        sprites: [],
        spritesheets: [],
        sounds: []
      };

      $scope.level = null;

      $scope.Init = function() {
        //Call the ajax file to read all the files.
        $http({method: 'GET', url: 'api/assets.php'})
          .success(function( data, status, headers, config ) {
            $scope.assets = data;
          });

        $http({method: 'GET', url:'api/level.php?level=' + $routeParams.levelId})
          .success(function (data, status, headers, config) {
            if ( data ) {
              $scope.level = data;
            }
          });
      };

      //Click on map
      $scope.ClickMap = function(e) {
        if ( $scope.selectedAsset != null ) {
          //Drop the asset down.
          var envGraphic = {
              sprite: {
                  image: $scope.selectedAsset,
                  x: 0,
                  y: 0,
                  z: 0,
                  scale: 1,
                  width: 120,
                  height: 130,
              },
              animation: {
                  frames: 0, //List of frames, or starting frame.
                  frameCount: 0, //Number of frames for the animation
                  interval: 0, //interval between frames.
                  loop: -1, // -1 infinite loop, 0 no loop
              },
              transformProps: { //Properties to transform
                  duration: 0, //Duration of the transformation.
                  x: 0,
                  y: 0
              }
          };

          $scope.level.graphics.animations.push(envGraphic);
          $scope.selectedGraphic = $scope.level.graphics.animations[$scope.level.graphics.animations.length - 1];
        }
      };

      $scope.PlayAnimation = function( obj ) {
        obj.playAnimation = true;
      };

      //Save the level to the corresponding file.
      $scope.SaveLevel = function( ) {
        $scope.jsonLevel = JSON.stringify($scope.level);

        $http({method:'POST', url:'api/level.php', data: {level: $routeParams.levelId, levelData: $scope.level}})
          .success(function (data, status, headers, config) {
            //Save Successful
          });
      };

      $scope.ImportLevel = function() {
        //Take the value from the textarea and convert to json.
        $scope.level = JSON.parse($scope.jsonLevel);
      };

      $scope.SelectAssetImage = function( e ) {
        var index = $(e.currentTarget).index();

        if ( $scope.assets.spritesheets[index] == $scope.selectedAsset ) {
          $scope.selectedAsset = null;
          $(".asset").removeClass("selected");
        } else {
          $scope.selectedAsset = $scope.assets.spritesheets[index];
          $(".asset").removeClass("selected");
          $(e.currentTarget).addClass("selected");
        }
      };

      $scope.ChangeGraphic = function( e, index ) {
        var target = $(e.currentTarget);
        target.siblings().removeClass("selected");
        target.addClass("selected");
        $scope.selectedGraphic = index;
      };

      $scope.RemoveGraphic = function() {
        $scope.level.graphics.animations.splice($scope.selectedGraphic, 1);
        $scope.selectedGraphic = null;
      };

      $scope.UpdateCursor = function( e ) {
        $scope.mouseX = e.offsetX;
        $scope.mouseY = e.offsetY;
      };
    }]);
