window.angular.module('ngale.directives.animationDirective', [])
  .directive('animateDir', function () {
      return {
        restrict: 'A',
        link: {
          post: function( scope, element, attrs ) {
            var obj = scope.obj;
            var animationTimer = 0;

            var tempObj = obj; //For resetting the transformations.

            //Set up the timer and animation
            scope.playAnimation = function() {

              var startFrame = obj.animation.frames;
              var endFrame = parseInt(startFrame) + (parseInt(obj.animation.frameCount) - 1);
              var count = startFrame;
              var x = 0;
              var y = 0;
              var frameWidth = obj.sprite.width;
              var frameHeight = obj.sprite.height;
              var framesX = 0;
              var framesY = 0;
              var imageHeight = 0;
              var imageWidth = 0;
              var image = new Image();

              clearInterval(animationTimer);

              function findImageWH() {
                imageHeight = this.height;
                imageWidth = this.width;
                framesX = imageWidth / frameWidth;
                framesY = imageHeight / frameHeight;

                x = -(count % framesX) * frameWidth;
                y = -((count / framesX)|0) * frameHeight;

                animationTimer = setInterval(animate, obj.animation.interval);

                return true;
              }

              var nextFrame = function() {
                x = -(count % framesX) * frameWidth;
                y = -((count / framesX)|0) * frameHeight;
              };

              (animate = function(){
                if( count++ >= endFrame ) {
                  count = startFrame;
                }

                nextFrame();
                //Update element background position
                element.css('background-position', x + 'px ' + y + 'px' );
              })();

              image.src = obj.sprite.image;
              image.onload = findImageWH;
            };

            scope.playTransform = function() {
              jQuery(element).animate({
                left: obj.transformProps.x + 'px',
                top: obj.transformProps.y + 'px'
              }, {
                duration: parseInt(obj.transformProps.duration),
                easing: "linear",
                done: function() {
                  //Reset the obj to temp and call animate again.
                  obj.sprite = tempObj.sprite;
                  element.css({
                    left: obj.sprite.x,
                    top: obj.sprite.y
                  });
                  scope.playTransform();
                },
                queue: false
              });
            };

            scope.$watch('obj', function(val) {
              clearInterval(animationTimer);
              scope.playAnimation();
              if ( parseInt(obj.transformProps.duration) != 0 ) {
                scope.playTransform();
              }
            }, true);
          }
        }
      };
  });
