function Screen(board) {
    this.board = board || null;
    this.optionNode = null;
    this.redraw();
}

Screen.prototype.redraw = function () {
    if (this.board !== null) {
        this.board.removeNodes();
        $('#playground').append(this.board.createNodes());
    }
};

Screen.prototype.destroyOptionNode = function() {
    $('#controls').empty();
}

Screen.prototype.save = function (name) {

};

Screen.prototype.load = function (name) {
};
