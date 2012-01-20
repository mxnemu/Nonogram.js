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
    this.cellNodes = [];
    this.horizontalLabelContainers = [];
    this.verticalLabelContainers = [];
    this.solution = null;
    this.history = new History();
}

Board.prototype = new Widget(); // inherit

Board.prototype.createNodes = function () {
    var _this = this,
        r, // row (<tr>)
        fr, // first row (labels)
        hl, // horizontal label-container
        vl, // vertical label-container
        c, // column (<td>)
        x,
        y;

    this.history.add(new Snapshot(this.iWidth, this.iHeight));

    // Create the nodes.
    this.node = $('<table/>').addClass('board');

    // Add the first label row.
    fr = $('<tr/>');
    $('<th/>').appendTo(fr); // top-left corner

    for (x = 1; x <= this.iWidth; ++x) {
        hl = $('<th/>').addClass('label-container horizontal');
        this.horizontalLabelContainers[x - 1] = hl;
        hl.appendTo(fr);
    }

    fr.appendTo(this.node);

    // Add the cells.
    for (y = 1; y <= this.iHeight; ++y) {
        r = $('<tr/>');

        // The first item in a row is a label.
        vl = $('<th/>').addClass('label-container vertical');
        this.verticalLabelContainers[y - 1] = vl;
        vl.appendTo(r);

        for (x = 1; x <= this.iWidth; ++x) (function (x, y) { // bind x and y
            // Create the cell.
            c = $('<td/>').addClass('cell');

            // Bind the cell.
            c.click(function (e) {
                e.preventDefault();
                _this.onClick(x, y);
            });
            c.bind('contextmenu', function (e) {
                e.preventDefault();
                _this.onRightClick(x, y);
            });

            // Store the cell.
            _this.cellNodes[y * _this.iWidth + x] = c;
            c.appendTo(r);
        }(x - 1, y - 1));

        r.appendTo(this.node);
    }

    // Fill the cells.
    for (y = 0; y < this.iHeight; ++y) {
        for (x = 0; x < this.iWidth; ++x) {
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

Board.prototype.setSolution = function (snapshot) {
    var c, // continuous count
        s, // status
        i,
        x,
        y,

        createLabel = function (count) {
            return $('<div/>').addClass('label').text(count);
        };

    this.solution = snapshot;

    // Clear existing labels.
    for (i = 0; i < this.horizontalLabelContainers.length; ++i) {
        this.horizontalLabelContainers[i].empty();
    }
    for (i = 0; i < this.verticalLabelContainers.length; ++i) {
        this.verticalLabelContainers[i].empty();
    }

    // Generate horizontal labels.
    for (x = 0; x < this.solution.width; ++x) {
        c = 0;

        for (y = 0; y < this.solution.height; ++y) {
            s = this.solution.get(x, y);

            if (s == CellStatus.ACTIVE) {
                c++; // heh
            } else if (c > 0) {
                // Push a label with the count and reset.
                createLabel(c).appendTo(this.horizontalLabelContainers[x]);
                c = 0;
            }
        }

        if (c > 0) {
            createLabel(c).appendTo(this.horizontalLabelContainers[x]);
        }
    }

    // Generate vertical labels.
    for (y = 0; y < this.solution.height; ++y) {
        c = 0;

        for (x = 0; x < this.solution.width; ++x) {
            s = this.solution.get(x, y);

            if (s == CellStatus.ACTIVE) {
                c++; // heh
            } else if (c > 0) {
                // Push a label with the count and reset.
                createLabel(c).prependTo(this.verticalLabelContainers[y]);
                c = 0;
            }
        }

        if (c > 0) {
            createLabel(c).prependTo(this.verticalLabelContainers[y]);
        }
    }
};

Board.prototype.removeNodes = function () {
    this.node.remove();
    this.node = null;
};

Board.prototype.serialize = function () {
    return {
        width:   this.iWidth,
        height:  this.iHeight,
        history: this.history.serialize()
    };
};

Board.prototype.restore = function (serialized) {
    this.iWidth = serialized.width;
    this.iHeight = serialized.height;
    this.history.restore(serialized.history);
};

Board.prototype.onClick = function (x, y) {};
Board.prototype.onRightClick = function (x, y) {};
