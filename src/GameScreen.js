/**
 * GameScreen constructor
 */
function GameScreen() {
    Screen.call(this, new GameBoard(10, 10)); // parent constructor
}

GameScreen.prototype = new Screen(); // inherit
