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

EditorBoard.prototype.onClick = function(x, y) {
    this.setCellStatus(x, y, CellStatus.ACTIVE, true);
};

EditorBoard.prototype.onRightClick = function(x, y) {
    this.setCellStatus(x, y, CellStatus.INACTIVE, true);
};
