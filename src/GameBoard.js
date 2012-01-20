/**
 * GameBoard constructor
 *
 * @param Object oDifficulty game difficulty
 * @param Object oHistory game history
 * @param Object oSolution game solution snapshot
 */
function GameBoard(iWidth, iHeight, oDifficulty, oHistory, oSolution) {
    // TODO: Insert real width and height.
    Board.call(this, iWidth, iHeight); // parent constructor

    this.oDifficulty = oDifficulty;
    this.oHistory = oHistory;
    this.oSolution = oSolution;
}

GameBoard.prototype = new Board(); // inherit

/**
 * onClick
 */
EditorBoard.prototype.onClick = function(x, y) {
    this.setCellStatus(x, y, this.getCellStatus(x, y) == CellStatus.ACTIVE? CellStatus.INACTIVE : CellStatus.ACTIVE);
};

/**
 * onRightClick
 */
EditorBoard.prototype.onRightClick = function(x, y) {
    this.setCellStatus(x, y, CellStatus.TAGGED);
};
