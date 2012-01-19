/**
 * Board constructor
 *
 * @tparm Integer iWidth board width
 * @tparm Integer iHeight board height
 */
function Board(iWidth, iHeight) {
    Widget.call(this); // parent constructor

    this.iWidth = iWidth;
    this.iHeight = iHeight;
    this.node = null;
    this.cellNodes = null;
    this.history = new History();
}

Board.prototype = new Widget(); // inherit

Board.prototype.createNodes = function () {
    var r, // row (<tr>)
        c, // column (<td>)
        x,
        y;

    this.history.add(new Snapshot(this.iWidth, this.iHeight));

    // Create the nodes.
    this.cellNodes = [];
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
            this.setCellStatus(x, y, CellStatus.INACTIVE);
        }
    }

    return this.node;
};

Board.prototype.getCellStatus = function (x, y) {
    return this.history.getCurrent().get(x, y) || CellStatus.INVALID;
};

Board.prototype.setCellStatus = function (x, y, newStatus) {
    var newSnapshot = new Snapshot(this.history.getCurrent()),
        cellNode = this.cellNodes[y * this.iWidth + x],
        currentStatus = this.getCellStatus(x, y);

    // Update nodes.
    cellNode.removeClass(CellStatus.toClass(currentStatus));
    cellNode.addClass(CellStatus.toClass(newStatus));

    // Update history.
    newSnapshot.set(x, y, newStatus);
    this.history.add(newSnapshot);
};

Board.prototype.removeNodes = function () {
    this.node.remove();
    this.node = null;
};
