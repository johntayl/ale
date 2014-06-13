window.angular.module('ngale.directives', [])
    .directive('onEnter', function() {
        return {
            link: function(scope, element, attrs) {
                element.bind("keypress", function( event ) {
                    if ( event.which === 13 ) {
                        scope.$apply(function() {
                            //Evaluate the angular
                            scope.$eval(attrs.onEnter);
                        });
                        event.preventDefault();
                    }
                });
            }
        };
    });
