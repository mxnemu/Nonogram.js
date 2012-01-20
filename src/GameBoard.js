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
