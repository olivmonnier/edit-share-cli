var editor = ace.edit('editor'),
  socket = io.connect();

function resizeEditor() {
  var h = window.innerHeight;
  $('#editor').css('height', (h - 2).toString() + 'px');
}

angular.module('app', ['ui.ace'])
  .controller('EditorCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.init = function() {
      $scope.code = Global.datas;
      editor.setReadOnly(Global.readOnly);
      resizeEditor();
    };
    $scope.save = function() {
      $http.post('/save', {
        'datas': editor.getValue()
      });
    };
    $scope.export = function(obj) {
      $(obj.target).attr('href', 'data:text/plain;charset=utf-8,' +
        encodeURIComponent(editor.getValue()));
    };
  }]);

socket.on('docChange', function(doc) {
  editor.setValue(doc.content);
  editor.gotoLine(doc.row);
})

$(document).ready(function() {
  $(window).on('resize', function() {
    resizeEditor();
  });

  $('#editor').keyup(function() {
    var editorContent = editor.getValue();
    var row = editor.selection.getCursor().row;
    socket.emit('docOnChange', {
      content: editorContent,
      row: row
    });
  })
})
