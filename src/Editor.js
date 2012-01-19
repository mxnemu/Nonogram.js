/**
 * Editor constructor
 */
function Editor(iWidth, iHeight) {
    Board.call(this, iWidth, iHeight); // parent constructor
    this.optionNode = null;
}

Editor.prototype = new Board(); // inherit

/**
 * creates the dom nodes for the option panel
 */
Editor.prototype.createOptionNode = function() {
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
            _this.history.getCurrent()
            , _this.optionNode.find('input[name="editor-gamename"]')
        );
    });

    return this.optionNode;
}

/**
 * onClick
 */
Editor.prototype.onClick = function(x, y) {
    var status;
    status = this.getCellStatus(x, y);
    this.setCellStatus(x, y, status == 1? 2 : 1);
}

/**
 * onRightClick
 */
Editor.prototype.onRightClick = function(x, y) {
    var status;
    status = this.getCellStatus(x, y);
    this.setCellStatus(x, y, status == 1? 2 : 1);
}
