/**
 * Editor constructor
 */
function Editor(iWidth, iHeight) {
    Board.call(this, iWidth, iHeight); // parent constructor
    this.optionNode = null;
}

Editor.prototype = new Board(); // inherit

/**
 * Saves a solution snapshot under a name.
 *
 * @tparam Object oSolution solution snapshot
 * @tparam String sName game name
 */
Editor.prototype.save = function (oSolution, sName) {
    localStorage.setItem("game-" + sName, JSON.stringify(oSolution.cells));
};

/**
 * load a solution snapshot under a name.
 *
 * @tparam String sName game name
 * @treturn Object solution snapshot
 */
Editor.prototype.load = function (sName) {
    return Board.prototype.load.call(this, sName);
    //var sSolutionSnapshot = localStorage.getItem("game-" + sName);
    //return JSON.parse(sSolutionSnapshot);
};

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
        // TODO: get oSolution
        _this.save(oSolution, _this.optionNode.find('input[name="editor-gamename"]'));
    });
    
    return this.optionNode;
}
