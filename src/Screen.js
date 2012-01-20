function Screen(board) {
    this.board = null;
    this.setBoard(board);
    this.optionNode = null;
    this.redraw();
}

Screen.prototype.setBoard = function (board) {
    if (this.board !== null) {
        this.board.removeNodes();
    }

    this.board = board || null;
};

Screen.prototype.redraw = function () {
    if (this.board !== null) {
        this.board.removeNodes();
        $('#viewport').empty().append(this.board.createNodes());
    }
};

Screen.prototype.destroyOptionNode = function() {
    $('#controls').empty();
}

Screen.prototype.save = function (name) {

};

Screen.prototype.load = function (name) {
};


Screen.prototype.getPresetGames = function() {
    return '{'
/*        spaceInvader: {},
        elefant: {},
        blackGuy: {},
        puzzelT: {},
        */
        +' "Elephant":{"width":13,"height":10,"history":{"currentOffset":0,"snapshots":[{"width":13,"height":10,"cells":[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,3,3,3,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,3,3,2,2,2,2,2,2,2,2,3,2,2,3,3,2,2,3,3,3,2,2,3,3,3,2,3,3,2,2,3,3,3,2,2,3,3,3,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2]}],"trackNodes":[]}},'
        
        +' "Invader":{"width":13,"height":10,"history":{"currentOffset":0,"snapshots":[{"width":13,"height":10,"cells":[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,2,3,3,3,3,3,3,3,2,3,3,3,2,3,3,3,3,3,3,3,2,2,2,2,2,2,2,3,3,3,3,3,2,2,3,2,2,2,3,2,2,3,3,3,2,2,2,2,2,2,2,2,2,2,2,3,3,2,3,2,2,2,2,2,2,2,3,2,3,3,2,3,2,3,3,3,3,3,2,3,2,3,3,3,3,3,2,2,3,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]}],"trackNodes":[]}} '

    + '}'
}
