/**
 * GameBoard constructor
 *
 * @param Object oDifficulty game difficulty
 * @param Object oHistory game history
 * @param Object oSolution game solution snapshot
 */
function GameBoard(iWidth, iHeight) {
    Board.call(this, iWidth, iHeight, CellStatus.INACTIVE); // parent constructor
    this.draggingLeftCellStatus = CellStatus.INVALID;
    this.draggingRightCellStatus = CellStatus.INVALID;
}

GameBoard.prototype = new Board(); // inherit

GameBoard.prototype.check = function () {
    if (!this.history.getCurrent().isValid(this.solution)) {
        // Fehlerposition speichern
    }

    if (this.history.getCurrent().isEqual(this.solution)) {
        alert("Herzlichen Glückwunsch, Sie haben gewonnen!");
    }
};

GameBoard.prototype.onEnter = function(x, y) {
    if (!this.solution || this.draggingLeftCellStatus == CellStatus.INVALID) return;
    this.setCellStatus(x, y, this.draggingLeftCellStatus, true);
    this.check();
};

GameBoard.prototype.onRightEnter = function(x, y) {
    if (!this.solution || this.draggingRightCellStatus == CellStatus.INVALID) return;
    this.setCellStatus(x, y, this.draggingRightCellStatus, true);
    this.check();
};

GameBoard.prototype.onDragStart = function (x, y) {
    if (!this.solution) return;
    this.draggingLeftCellStatus = this.getCellStatus(x, y) !== CellStatus.ACTIVE ? CellStatus.ACTIVE : CellStatus.INACTIVE;
};

GameBoard.prototype.onRightDragStart = function (x, y) {
    this.draggingRightCellStatus = CellStatus.TAGGED;
};

GameBoard.prototype.onDragStop = function () {
    this.draggingLeftCellStatus = CellStatus.INVALID;
};

GameBoard.prototype.onRightDragStop = function () {
    this.draggingRightCellStatus = CellStatus.INVALID;
};
