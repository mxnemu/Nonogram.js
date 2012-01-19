/**
 * Game constructor
 *
 * @param Object oDifficulty game difficulty
 * @param Object oHistory game history
 * @param Object oSolution game solution snapshot
 */
function Game(oDifficulty, oHistory, oSolution) {
    // TODO: Insert real width and height.
    Board.call(this, 0, 0); // parent constructor

    this.oDifficulty = oDifficulty;
    this.oHistory = oHistory;
    this.oSolution = oSolution;
}

Game.prototype = new Board(); // inherit
