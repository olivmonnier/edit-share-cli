var editor = ace.edit('editor'),
  socket = io.connect();

angular.module('app', ['ui.ace'])
  .controller('EditorCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.init = function() {
      $scope.code = Global.datas;
      editor.setReadOnly(Global.readOnly);
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
  $('#editor').keypress(function(e) {
    var charInput = String.fromCharCode(e.which);
    var editorContent = editor.getValue() + charInput;
    socket.emit('docOnChange', editorContent);
  })
})
