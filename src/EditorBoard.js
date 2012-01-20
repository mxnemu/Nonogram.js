/**
 * EditorBoard constructor
 */
function EditorBoard(iWidth, iHeight) {
    Board.call(this, iWidth, iHeight); // parent constructor
}

EditorBoard.prototype = new Board(); // inherit

EditorBoard.prototype.setCellStatus = function () {
    Board.prototype.setCellStatus.apply(this, Array.prototype.slice.call(arguments));

    // Use the current version as the solution.
    this.setSolution(this.history.getCurrent());
};

/**
 * onClick
 */
EditorBoard.prototype.onClick = function(x, y) {
    this.setCellStatus(x, y, this.getCellStatus(x, y) == CellStatus.ACTIVE? CellStatus.INACTIVE : CellStatus.ACTIVE, true);
};
