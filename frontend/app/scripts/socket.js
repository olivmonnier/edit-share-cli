var socket = io.connect();

$(document).ready(function() {

  socket.on('docChange', function(doc) {
    var cursorPos = doc.editor.cursor;
    editor.setValue(doc.file.content);
    editor.getSession().getSelection().selectionLead.setPosition(
      cursorPos.row,
      cursorPos.column);
    Global = doc;
  });

  $('#editor').keyup(function() {
    var editorContent = editor.getValue();
    var cursorPos = editor.selection.getCursor();
    socket.emit('docOnChange', {
      content: editorContent,
      cursor: cursorPos
    });
  })
});
