var editor = ace.edit('editor');
angular.module('app', ['ui.ace'])
  .controller('EditorCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.init = function() {
      $scope.code = datas;
    };
    $scope.save = function() {
      console.log(editor.getValue());
      $http.post('/save', {
        'datas': editor.getValue()
      });
    }
  }]);
