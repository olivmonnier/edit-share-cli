var editor = ace.edit('editor');
window.Editor = editor;

function resizeEditor() {
  var h = window.innerHeight;
  $('#editor').css('height', (h - 50).toString() + 'px');
}

angular.module('app', ['ui.ace'])
  .controller('EditorCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.themes = ace.require('ace/ext/themelist').themesByName;
    $scope.theme = "";
    $scope.tabSizes = [2, 4, 6, 8];
    $scope.fontSizes = [8, 10, 12, 14, 16, 18];
    $scope.fontSize = 12;
    $scope.tabSize = $scope.tabSizes[0];
    $scope.wrapMode = true;

    $scope.init = function() {
      $scope.code = Global.file.content;
      resizeEditor();
    };

    $scope.aceOption = {
      require: ['ace/ext/language_tools'],
      mode: Global.file.format,
      theme: 'textmate',
      advanced: {
        enableSnippets: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
      },
      onLoad: function(_editor) {
        //Initialize
        _editor.setReadOnly(Global.editor.readonly);
        _editor.$blockScrolling = Infinity;
        _editor.getSession().setUseSoftTabs(true);
        _editor.getSession().setTabSize($scope.tabSize);
        _editor.getSession().setUseWrapMode($scope.wrapMode);
        //Events
        $scope.themeChanged = function(theme) {
          _editor.setTheme('ace/theme/' + theme.name);
          $scope.theme = theme;
        };
        $scope.fontSizeChanged = function(fontSize) {
          document.getElementById('editor').style.fontSize = fontSize +
            'px';
          $scope.fontSize = fontSize;
        };
        $scope.tabSizeChanged = function(tabSize) {
          _editor.getSession().setTabSize(tabSize);
          $scope.tabSize = tabSize;
        };
        $scope.wrapChanged = function() {
          ($scope.wrapMode)? $scope.wrapMode = false : $scope.wrapMode = true;
          _editor.getSession().setUseWrapMode($scope.wrapMode);
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
      }
    };
  }]);


$(document).ready(function() {
  $(window).on('resize', function() {
    resizeEditor();
  });
})
