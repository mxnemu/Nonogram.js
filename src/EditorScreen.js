/**
 * EditorScreen constructor
 */
function EditorScreen() {
    Screen.call(this, new EditorBoard(10, 10)); // parent constructor
    this.optionNode = null;
    if (this.board) {
        $('#controls').append(this.createOptionNode());
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
            + '<fieldset>'
                + '<legend>Create</legend>'
                + '<table>'
                    + '<tr><th>Width</th><td><input name="editor-width" type="text" /></td></tr>'
                    + '<tr><th>Height</th><td><input name="editor-height" type="text" /></td></tr>'
                + '</table>'
                + '<input name="editor-create" type="button" value="create" />'
            + '</fieldset>'
            + '<fieldset>'
                + '<legend>Save</legend>'
                + '<table>'
                    + '<tr><th>Name</th><td><input name="editor-gamename" type="text" /></td></tr>'
                + '</table>'
                + '<input name="editor-save" type="button" value="save" />'
            + '</fieldset>'
            + '<fieldset>'
                + '<legend>Load</legend>'
                + 'list goes here'
            + '</fieldset>'
        + '</div>'
    );

    this.optionNode.find('input[name="editor-save"]').click(function() {
        _this.save(_this.optionNode.find('input[name="editor-gamename"]').val(), _this);
    });

    return this.optionNode;
}

