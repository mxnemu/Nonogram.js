/**
 * EditorBoard constructor
 */
function EditorBoard(iWidth, iHeight) {
    Board.call(this, iWidth, iHeight); // parent constructor
    this.optionNode = null;
}

EditorBoard.prototype = new Board(); // inherit

/**
 * creates the dom nodes for the option panel
 */
/*Editor.prototype.createOptionNode = function() {
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
}*/

EditorBoard.prototype.setCellStatus = function () {
    Board.prototype.setCellStatus.apply(this, Array.prototype.slice.call(arguments));

    // Use the current version as the solution.
    this.setSolution(this.history.getCurrent());
};

/**
 * onClick
 */
EditorBoard.prototype.onClick = function(x, y) {
    this.setCellStatus(x, y, this.getCellStatus(x, y) == CellStatus.ACTIVE? CellStatus.INACTIVE : CellStatus.ACTIVE);
}

/**
 * onRightClick
 */
EditorBoard.prototype.onRightClick = function(x, y) {
    this.onClick(x, y);
}
