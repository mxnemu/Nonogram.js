function Screen(board) {
    this.board = board || null;
    this.redraw();
}

Screen.prototype.redraw = function () {
    if (this.board !== null) {
        this.board.removeNodes();
        $('#playground').append(this.board.createNodes());
    }
};

Screen.prototype.save = function (name) {
    if (this.board === null) throw "Could not save `" + name + "'.";
    window.localStorage.setItem(name, JSON.stringify(this.board.serialize()));
    console.log(window.localStorage[name]);
};

Screen.prototype.load = function (name) {
    var serialized = window.localStorage.getItem(name);
    if (!serialized) throw "Could not load `" + name + "'.";
    this.board.restore(JSON.parse(serialized));
};
