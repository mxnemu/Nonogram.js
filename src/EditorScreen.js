/**
 * EditorScreen constructor
 */
function EditorScreen() {
    Screen.call(this, new EditorBoard(10, 10)); // parent constructor
}

EditorScreen.prototype = new Screen(); // inherit
