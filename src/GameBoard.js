/**
 * GameBoard constructor
 *
 * @param Object oDifficulty game difficulty
 * @param Object oHistory game history
 * @param Object oSolution game solution snapshot
 */
function GameBoard(iWidth, iHeight) {
    Board.call(this, iWidth, iHeight, CellStatus.UNMARKED); // parent constructor
}

GameBoard.prototype = new Board(); // inherit

GameBoard.prototype.onClick = function(x, y) {
    if (!this.solution) return;

    this.setCellStatus(x, y, this.getCellStatus(x, y) !== CellStatus.INACTIVE ? CellStatus.INACTIVE : CellStatus.ACTIVE, true);
    if (!this.history.getCurrent().isValid(this.solution)) {
        // Fehlerposition speichern
    }
    if (this.history.getCurrent().isEqual(this.solution))
        alert("Herzlichen Glückwunsch, Sie haben gewonnen!");
};

GameBoard.prototype.onRightClick = function(x, y) {
    if (!this.solution) return;
    this.setCellStatus(x, y, CellStatus.UNMARKED, true);
};
