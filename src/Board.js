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
    var r, // row (<tr>)
        c, // column (<td>)
        x,
        y;

    this.node = $('<table/>').addClass('board');

    for (y = 0; y < this.iWidth; ++y) {
        r = $('<tr/>');

        for (x = 0; x < this.iHeight; ++x) {
            c = $('<td/>').text((x + 1) + 'x' + (y + 1));
            c.appendTo(r);
        }

        r.appendTo(this.node);
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
