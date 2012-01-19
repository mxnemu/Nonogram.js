/**
 * Editor constructor
 */
function Editor(iWidth, iHeight) {
    Board.call(this, iWidth, iHeight); // parent constructor
}

Editor.prototype = new Board(); // inherit

/**
 * Saves a solution snapshot under a name.
 *
 * @param Object oSolution solution snapshot
 * @param String sName game name
 */
Editor.prototype.save = function (oSolution, sName) {
    // TODO
};

/**
 * load a solution snapshot under a name.
 *
 * @param String sName game name
 * @return Object solution snapshot
 */
Editor.prototype.load = function (sName) {
    // TODO
};
