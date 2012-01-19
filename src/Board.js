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
    this.cellNodes = [];
}

Board.prototype = new Widget(); // inherit

Board.prototype.createNodes = function () {
    var r, // row (<tr>)
        c, // column (<td>)
        x,
        y;

    // Create the nodes.
    this.node = $('<table/>').addClass('board');

    for (y = 0; y < this.iWidth; ++y) {
        r = $('<tr/>');

        for (x = 0; x < this.iHeight; ++x) {
            c = $('<td/>').addClass('cell');
            c.data('x', x).data('y', y);

            this.cellNodes[y * this.iWidth + x] = c;
            c.appendTo(r);
        }

        r.appendTo(this.node);
    }

    // Fill the cells.
    for (y = 0; y < this.iWidth; ++y) {
        for (x = 0; x < this.iHeight; ++x) {
            this.setCellStatus(x, y, x % 2 == 0 ? CellStatus.INACTIVE : CellStatus.ACTIVE);
        }
    }

    return this.node;
};

Board.prototype.getCellNode = function (x, y) {
    return this.cellNodes[y * this.iWidth + x];
};

Board.prototype.getCellStatus = function (x, y) {
    return this.getCellNode().data('status') || CellStatus.INVALID;
};

Board.prototype.setCellStatus = function (x, y, newStatus) {
    var cellNode = this.getCellNode(x, y),
        currentStatus = this.getCellStatus(x, y);

    cellNode.removeClass(CellStatus.toClass(currentStatus));
    cellNode.addClass(CellStatus.toClass(newStatus));
    cellNode.data('status', newStatus);
};

Board.prototype.removeNodes = function () {
    this.node.remove();
    this.node = null;
};
