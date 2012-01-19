/**
 * Board constructor
 *
 * @param Integer iWidth board width
 * @param Integer iHeight board height
 */
function Board(iWidth, iHeight) {
    Widget.call(this); // parent constructor

    this.iWidth = iWidth;
    this.iHeight = iHeight;
    this.node = null;
}

Board.prototype = new Widget(); // inherit

Board.prototype.createNodes = function () {
    var r, c, x, y;

    this.node = $('<table/>');

    for (y = 0; y < this.iWidth; ++y) {
        r = $('<tr/>');

        for (x = 0; x < this.iHeight; ++x) {
            c = $('<td/>').text((x + 1) + 'x' + (y + 1)).appendTo(r);
        }

        r.appendTo(t);
    }

    return this.node;
};

Board.prototype.updateNodes = function () {
    // TODO
};

Board.prototype.removeNodes = function () {
    this.node.remove();
    this.node = null;
};
