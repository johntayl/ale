window.app = angular.module('ngAngularLevelEditor', ['ngRoute', 'ngale.controllers', 'ngale.directives', 'ngale.services']);

// bundling dependencies
window.angular.module('ngale.controllers', [
  'ngale.controllers.aleController',
  'ngale.controllers.levelManagerController',
  'ngale.controllers.editorController'
]);
window.angular.module('ngale.directives', [
  'ngale.directives.animationDirective'
]);
window.angular.module('ngale.services', [
]);
