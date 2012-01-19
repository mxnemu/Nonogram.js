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
    this.oHistory = new History();
}

Board.prototype = new Widget(); // inherit

Board.prototype.createNodes = function () {
    var r, // row (<tr>)
        c, // column (<td>)
        x,
        y;
        
    this.oHistory.add(new Snapshot(this.iWidth, this.iHeight));
    this.cellNodes = new Array(this.iWidth*this.iHeight);

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
            this.setCellStatus(x, y, CellStatus.INACTIVE);
        }
    }

    return this.node;
};

Board.prototype.getCellStatuses = function () {
    return this.oHistory.getCurrent().getCells.slice(0);
};

Board.prototype.getCellStatus = function (x, y) {
    return this.oHistory.getCurrent().get(x,y) || CellStatus.INVALID; // [y * this.iWidth + x]
};

Board.prototype.setCellStatus = function (x, y, newStatus) {
    var oNewSnapshot = new Snapshot(this.oHistory.getCurrent());
    var cellNode = this.cellNodes[y * this.iWidth + x],
        currentStatus = this.getCellStatus(x, y);

    cellNode.removeClass(CellStatus.toClass(currentStatus));
    cellNode.addClass(CellStatus.toClass(newStatus));
    oNewSnapshot.set(x, y, newStatus); // [y * this.iWidth + x]
    this.oHistory.add(oNewSnapshot);
};

Board.prototype.removeNodes = function () {
    this.node.remove();
    this.node = null;
};
