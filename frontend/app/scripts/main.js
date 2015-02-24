angular.module('app', ['ui.ace'])
  .controller('EditorCtrl', ['$scope', function($scope) {
    $scope.init = function(code) {
      $scope.code = code;
    };
  }]);
