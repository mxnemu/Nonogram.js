/**
 * EditorScreen constructor
 */
function EditorScreen() {
    Screen.call(this, new EditorBoard(10, 10)); // parent constructor
    this.optionNode = null;
    if (this.board) {
        $('#controlls').append(this.createOptionNode());
    }
}

EditorScreen.prototype = new Screen(); // inherit

/**
 * creates the dom nodes for the option panel
 */
EditorScreen.prototype.createOptionNode = function() {
    var _this = this;
    this.optionNode = $(
          '<div class="option-node" id="option-node-editor">'
            + '<h2>EDITOR</h2>'
            + '<input name="editor-gamename" type="text" />'
            + '<input name="editor-load" type="button" value="load" />'
            + '<input name="editor-save" type="button" value="save" />'
        + '</div>'
    );

    this.optionNode.find('input[name="editor-load"]').click(function() {
        _this.load(_this.optionNode.find('input[name="editor-gamename"]'));
    });

    this.optionNode.find('input[name="editor-save"]').click(function() {
        _this.save(
            _this.optionNode.find('input[name="editor-gamename"]')
            , _this
        );
    });

    return this.optionNode;
}

