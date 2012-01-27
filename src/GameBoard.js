/**
 * GameBoard constructor
 *
 * iWidth int width of the board to create.
 * iHeight int height of the board to create.
 * @ctor 
 * Constructor.
 * Set draggingLeftCellStatus and draggingRightCellStatus to CellStatus.INVALID.
 * These variables will be used to set the new CellStatus in a mouse drag action.
 * When they are invalid the cellStatus will not be changed when the mouse moves over cells.
 */
function GameBoard(iWidth, iHeight) {
    Board.call(this, iWidth, iHeight, CellStatus.INACTIVE); // parent constructor
    this.draggingLeftCellStatus = CellStatus.INVALID;
    this.draggingRightCellStatus = CellStatus.INVALID;
}

GameBoard.prototype = new Board(); // inherit


/**
 * Check if the current Snapshot is equal with the solutionSnapshot.
 * Print an alert if the game is won.
 * TODO: save the position of the last valid Snapshot, if the current is no longer valid.
 */
GameBoard.prototype.check = function () {
    if (!this.history.getCurrent().isValid(this.solution)) {
        // Fehlerposition speichern
    }

    if (this.history.getCurrent().isEqual(this.solution)) {
        alert("Herzlichen Glückwunsch, Sie haben gewonnen!");
    }
};

/**
 * Set a cell status to this.draggingLeftCellStatus when the mouse is dragged over it.
 * If this.draggingLeftCellStatus is CellStatus.INVALID don't do anything.
 */
GameBoard.prototype.onEnter = function(x, y) {
    if (!this.solution || this.draggingLeftCellStatus == CellStatus.INVALID) return;
    this.setCellStatus(x, y, this.draggingLeftCellStatus, true);
    this.check();
};

/**
 * Set a cell status to this.draggingRightCellStatus when the mouse is dragged over it.
 * If this.draggingRightCellStatus is CellStatus.INVALID don't do anything.
 */
GameBoard.prototype.onRightEnter = function(x, y) {
    if (!this.solution || this.draggingRightCellStatus == CellStatus.INVALID) return;
    this.setCellStatus(x, y, this.draggingRightCellStatus, true);
    this.check();
};

/**
 * This drag will set all touched cells to ACTIVE when it starts on an INACTIVE or TAGGED cell.
 * This drag will set all touched cells to INACTIVE when it starts on an ACTIVE cell.
 */
GameBoard.prototype.onDragStart = function (x, y) {
    if (!this.solution) return;
    this.draggingLeftCellStatus = this.getCellStatus(x, y) !== CellStatus.ACTIVE ? CellStatus.ACTIVE : CellStatus.INACTIVE;
};

/**
 * RightClick drags will always set touched cells to TAGGED.
 */
GameBoard.prototype.onRightDragStart = function (x, y) {
    this.draggingRightCellStatus = CellStatus.TAGGED;
};

/**
 * Stop updateing the cellstatus when cells are touched by the mouse curser.
 */
GameBoard.prototype.onDragStop = function () {
    this.draggingLeftCellStatus = CellStatus.INVALID;
};

/**
 * Stop updateing the cellstatus when cells are touched by the mouse curser.
 */
GameBoard.prototype.onRightDragStop = function () {
    this.draggingRightCellStatus = CellStatus.INVALID;
};
