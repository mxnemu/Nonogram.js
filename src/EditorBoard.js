/**
 * EditorBoard constructor
 */
function EditorBoard(iWidth, iHeight) {
    Board.call(this, iWidth, iHeight, CellStatus.INACTIVE); // parent constructor
}

EditorBoard.prototype = new Board(); // inherit

EditorBoard.prototype.setCellStatus = function () {
    Board.prototype.setCellStatus.apply(this, Array.prototype.slice.call(arguments));

    // Use the current version as the solution.
    this.setSolution(this.history.getCurrent());
};

EditorBoard.prototype.onEnter = function(x, y) {
    if (!this.solution) return;
    this.setCellStatus(x, y, CellStatus.ACTIVE, true);
};

EditorBoard.prototype.onRightEnter = function(x, y) {
    if (!this.solution) return;
    this.setCellStatus(x, y, CellStatus.INACTIVE, true);
};
