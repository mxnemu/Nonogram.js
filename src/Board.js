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
    var _this = this,
        r, // row (<tr>)
        c, // column (<td>)
        x,
        y;

    this.history.add(new Snapshot(this.iWidth, this.iHeight));

    // Create the nodes.
    this.cellNodes = [];
    this.node = $('<table/>').addClass('board');

    for (y = 0; y < this.iWidth; ++y) {
        r = $('<tr/>');

        for (x = 0; x < this.iHeight; ++x) (function (x, y) { // bind x and y
            // Create the cell.
            c = $('<td/>').addClass('cell');

            // Bind the cell.
            c.click(function () {
                _this.onClick(x, y);
            });
            c.bind('contextmenu', function () {
                _this.onRightClick(x, y);
            });

            // Store the cell.
            _this.cellNodes[y * _this.iWidth + x] = c;
            c.appendTo(r);
        }(x, y));

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

Board.prototype.onClick = function (x, y) {};
Board.prototype.onRightClick = function (x, y) {};
