/**
 * GameBoard constructor
 *
 * @param Object oDifficulty game difficulty
 * @param Object oHistory game history
 * @param Object oSolution game solution snapshot
 */
function GameBoard(iWidth, iHeight, oDifficulty, oHistory, oSolution) {
    Board.call(this, iWidth, iHeight, CellStatus.UNMARKED); // parent constructor

    this.oDifficulty = oDifficulty;
    this.oHistory = oHistory;
    this.oSolution = oSolution;
}

GameBoard.prototype = new Board(); // inherit

GameBoard.prototype.onClick = function(x, y) {
    this.setCellStatus(x, y, this.getCellStatus(x, y) !== CellStatus.ACTIVE ? CellStatus.ACTIVE : CellStatus.INACTIVE, true);
};

GameBoard.prototype.onRightClick = function(x, y) {
    this.setCellStatus(x, y, CellStatus.UNMARKED, true);
};
