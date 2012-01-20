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
