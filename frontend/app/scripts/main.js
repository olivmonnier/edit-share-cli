var editor = ace.edit('editor'),
  socket = io.connect();
angular.module('app', ['ui.ace'])
  .controller('EditorCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.init = function() {
      $scope.code = datas;
    };
    $scope.save = function() {
      $http.post('/save', {
        'datas': editor.getValue()
      });
    };
  }]);

socket.on('docChange', function(doc) {
  editor.setValue(doc);
})

$(document).ready(function() {
  $(document).keypress(function() {
    console.log('changed', editor.getValue());
    socket.emit('docOnChange', editor.getValue());
  })
})
