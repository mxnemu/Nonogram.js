/**
 * GameBoard constructor
 *
 * @param Object oDifficulty game difficulty
 * @param Object oHistory game history
 * @param Object oSolution game solution snapshot
 */
function GameBoard(iWidth, iHeight, oDifficulty, oHistory, oSolution) {
    Board.call(this, iWidth, iHeight); // parent constructor

    this.oDifficulty = oDifficulty;
    this.oHistory = oHistory;
    this.oSolution = oSolution;
}

GameBoard.prototype = new Board(); // inherit

/**
 * onClick
 */
GameBoard.prototype.onClick = function(x, y) {
    this.setCellStatus(x, y, this.getCellStatus(x, y) !== CellStatus.ACTIVE ? CellStatus.ACTIVE : CellStatus.INACTIVE, true);
    if (!this.oHistory.getCurrent.isValid()) {
        // Fehlerposition speichern
    }
    if (this.oHistory.getCurrent.isEqual(this.solution))
        alert("Herzlichen Glückwunsch, Sie haben gewonnen!");
};

/**
 * onRightClick
 */
GameBoard.prototype.onRightClick = function(x, y) {
    this.setCellStatus(x, y, this.getCellStatus(x, y) !== CellStatus.TAGGED ? CellStatus.TAGGED : CellStatus.INACTIVE, true);
};
