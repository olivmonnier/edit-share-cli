var editor = ace.edit('editor');
window.Editor = editor;

function resizeEditor() {
  var h = window.innerHeight;
  $('#editor').css('height', (h - 50).toString() + 'px');
}

angular.module('app', ['ui.ace'])
  .controller('EditorCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.themes = ['Monokai', 'Chrome'];
    $scope.tabs = [2, 4, 6, 8];
    $scope.theme = $scope.themes[0];
    $scope.fontSize = 12;
    $scope.tabSize = $scope.tabs[0];
    $scope.wrapMode = true;

    $scope.init = function() {
      $scope.code = Global.file.content;
      resizeEditor();
    };

    $scope.aceOption = {
      require: ['ace/ext/language_tools'],
      mode: Global.file.format,
      theme: $scope.theme.toLowerCase(),
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
        $scope.themeChanged = function() {
          _editor.setTheme('ace/theme/' + $scope.theme.toLowerCase());
        };
        $scope.fontSizeChanged = function() {
          document.getElementById('editor').style.fontSize = $scope.fontSize +
            'px';
        };
        $scope.tabSizeChanged = function() {
          _editor.getSession().setTabSize($scope.tabSize);
        }
        $scope.wrapChanged = function() {
          _editor.getSession().setUseWrapMode($scope.wrapMode);
        }
      }
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


$(document).ready(function() {
  $(window).on('resize', function() {
    resizeEditor();
  });
})
