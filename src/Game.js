/**
 * Game constructor
 * 
 * @param Object oDifficulty game difficulty
 * @param Object oHistory game history
 * @param Object oSolution game solution snapshot
 */
function Game(oDifficulty, oHistory, oSolution) {
    this.oDifficulty = oDifficulty;
    this.oHistory = oHistory;
    this.oSolution = oSolution;
}

//TODO: check if we need to implement the following methods, because they're allready implemented in Widget.
//      createNodes();
//      updateNodes();
//      removeNodes();

