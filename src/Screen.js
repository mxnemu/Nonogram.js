/**
 * Handles the options menu and the board
 * @ctor Constructor call setBoard with the given board and redraw it, once it is set
 */
function Screen(board) {
    this.board = null;
    this.setBoard(board);
    this.optionNode = null;
    this.redraw();
}

/**
 * Set the this.board and remove the nodes of the existing board
 * @tparm Board setter value for this.board
 */
Screen.prototype.setBoard = function (board) {
    if (this.board !== null) {
        this.board.removeNodes();
    }

    this.board = board || null;
};


/**
 * Remove the nodes of the current board and recreate it in the #viewport.
 * If no board is set do nothing.
 */
Screen.prototype.redraw = function () {
    if (this.board !== null) {
        this.board.removeNodes();
        $('#viewport').empty().append(this.board.createNodes());
    }
};

/**
 * clear the #controls div
 */
Screen.prototype.destroyOptionNode = function() {
    $('#controls').empty();
}

/**
 * full virtual save function: will save the board and settings to the localStorage.
 * @tparm String name name in localStorage.
 */
Screen.prototype.save = function (name) {

};

/**
 * full virtual load function: will load the board and settings from localStorage.
 * @tparm String name name of the serializedGame in localStorage.
 */ 
Screen.prototype.load = function (name) {

};

/**
 * @treturn String returns a JSON String that contains an Object with serialized predefined boards.
 */
Screen.prototype.getPresetGames = function() {
    return '{'
        +' "Elephant":{"width":13,"height":10,"history":{"currentOffset":0,"snapshots":[{"width":13,"height":10,"cells":[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,3,3,3,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,3,3,2,2,2,2,2,2,2,2,3,2,2,3,3,2,2,3,3,3,2,2,3,3,3,2,3,3,2,2,3,3,3,2,2,3,3,3,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2]}],"trackNodes":[]}},'

        +' "Invader":{"width":13,"height":10,"history":{"currentOffset":0,"snapshots":[{"width":13,"height":10,"cells":[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,2,3,3,3,3,3,3,3,2,3,3,3,2,3,3,3,3,3,3,3,2,2,2,2,2,2,2,3,3,3,3,3,2,2,3,2,2,2,3,2,2,3,3,3,2,2,2,2,2,2,2,2,2,2,2,3,3,2,3,2,2,2,2,2,2,2,3,2,3,3,2,3,2,3,3,3,3,3,2,3,2,3,3,3,3,3,2,2,3,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]}],"trackNodes":[]}} '

    + '}'
}
