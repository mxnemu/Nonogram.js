/**
 * Application constructor
 */
function Application() {
    this.storage = new Storage();
    this.board = new Board(10, 10); // TODO: Initialize with Game or Editor objects.
    $('#playground').append(this.board.createNodes());
}

Application.prototype.save = function (name, board) {
    window.localStorage.setItem(name, JSON.stringify(board.serialize()));
};

Application.prototype.load = function (name) {
    var serialized = window.localStorage.getItem(name);
    if (!serialized) throw "Could not load `" + name + "'.";
    this.board.restore(serialized);
};
