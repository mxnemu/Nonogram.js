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

    // Create the nodes.
    this.node = $('<table/>').addClass('board');

    for (y = 0; y < this.iWidth; ++y) {
        r = $('<tr/>');

        for (x = 0; x < this.iHeight; ++x) {
            c = $('<td/>').addClass('cell');

            c.attr('id', 'cell-x' + x + '-y' + y);
            c.data('x', x).data('y', y);

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
    return $('#cell-x' + x + '-y' + y, this.node);
};

Board.prototype.getCellStatus = function (x, y) {
    return parseInt(this.getCellNode().data('status'), 10);
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
