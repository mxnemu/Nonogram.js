/**
 * EditorBoard constructor
 */
function EditorBoard(iWidth, iHeight) {
    Board.call(this, iWidth, iHeight, CellStatus.INACTIVE); // parent constructor
}

EditorBoard.prototype = new Board(); // inherit

/**
 * Update the SolutionSnapshot when setting the cellStatus on the board.
 * This also updates the hints displayed on the borders of the board.
 */
EditorBoard.prototype.setCellStatus = function () {
    Board.prototype.setCellStatus.apply(this, Array.prototype.slice.call(arguments));

    // Use the current version as the solution.
    this.setSolution(this.history.getCurrent());
};

/**
 * Handles the behaviour when a mouse with the leftMouseButton down enters a cell.
 * Set the Cellstatus to ACTIVE if a SolutionSnapshot exists that can be modified,
 * otherwise do nothing.
 */
EditorBoard.prototype.onEnter = function(x, y) {
    if (!this.solution) return;
    this.setCellStatus(x, y, CellStatus.ACTIVE, true);
};

/**
 * Handles the behaviour when a mouse with the rightMouseButton down enters a cell.
 * Set the Cellstatus to INACTIVE if a SolutionSnapshot exists that can be modified,
 * otherwise do nothing.
 */
EditorBoard.prototype.onRightEnter = function(x, y) {
    if (!this.solution) return;
    this.setCellStatus(x, y, CellStatus.INACTIVE, true);
};
