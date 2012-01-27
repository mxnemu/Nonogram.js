/**
 * Board constructor
 *
 * @tparm Integer iWidth board width
 * @tparm Integer iHeight board height
 */
function Board(iWidth, iHeight, defaultCellStatus) {
    Widget.call(this); // parent constructor

    this.iWidth = iWidth;
    this.iHeight = iHeight;
    this.defaultCellStatus = defaultCellStatus || CellStatus.INVALID;
    this.node = null;
    this.cellNodes = [];
    this.horizontalLabelContainers = [];
    this.verticalLabelContainers = [];
    this.solution = null;
    this.history = new History();

    if (arguments.length > 0) {
        this.history.add(new Snapshot(this.iWidth, this.iHeight, this.defaultCellStatus));
    }
}

Board.prototype = new Widget(); // inherit


/**
 * Create the nodes for all the cells and hints for the solution at the border.
 * The cells are stored in <td> tags with the css class .cell
 * The horizontal hint labels are stored in <th> tags with the css calsses .label-container .horizontal
 * The vertical hint labels are stored in <td> tags with the css calsses .label-container .vertical
 */
Board.prototype.createNodes = function () {
    var _this = this,
        b, // board
        t, // table
        r, // row (<tr>)
        fr, // first row (labels)
        hl, // horizontal label-container
        vl, // vertical label-container
        c, // column (<td>)
        x,
        y,
        lw, // label width
        lh, // label height
        lc, // label container dummy
        lcp, // label container padding
        leftDown = false,
        rightDown = false;

    $(document).mouseup(function (e) {
        e.preventDefault();

        if (e.which == 1) {
            leftDown = false;
            _this.onDragStop();
        } else if (e.which == 3) {
            rightDown = false;
            _this.onRightDragStop();
        }
    }).mouseleave(function () {
        if (leftDown) {
            leftDown = false;
            _this.onDragStop();
        }
        if (rightDown) {
            rightDown = false;
            _this.onRightDragStop();
        }
    });

    // Create the nodes.
    this.node = $('<div/>').addClass('board-container');
    b = $('<div/>').addClass('board');

    t = $('<table/>');
    lw = $('<div class="board"><div class="label-container vertical"><div class="label"></div></div></div>').find('.label').width();
    lh = $('<div class="board"><div class="label-container horizontal"><div class="label"></div></div></div>').find('.label').height();

    lc = $('<div class="board"><div class="label-container horizontal"></div></div>').find('.label-container');
    lcp = lc.outerHeight() - lc.height();

    // Add the first label row.
    fr = $('<tr/>');
    $('<th/>').appendTo(fr); // top-left corner

    for (x = 1; x <= this.iWidth; ++x) {
        hl = $('<th/>').addClass('label-container horizontal').height(Math.ceil(this.iHeight / 2) * lh + lcp);
        this.horizontalLabelContainers[x - 1] = hl;
        hl.appendTo(fr);
    }

    fr.appendTo(t);

    // Add the cells.
    for (y = 1; y <= this.iHeight; ++y) {
        r = $('<tr/>');

        // The first item in a row is a label.
        vl = $('<th/>').addClass('label-container vertical').width(Math.ceil(this.iWidth / 2) * lw);
        this.verticalLabelContainers[y - 1] = vl;
        vl.appendTo(r);

        for (x = 1; x <= this.iWidth; ++x) (function (x, y) { // bind x and y
            // Create the cell.
            c = $('<td/>').addClass('cell');

            // Bind the cell.
            c.mousedown(function (e) {
                e.preventDefault();

                if (e.which == 1) {
                    leftDown = true;
                    _this.onDragStart(x, y);
                    _this.onEnter(x, y);
                } else if (e.which == 3) {
                    rightDown = true;
                    _this.onRightDragStart(x, y);
                    _this.onRightEnter(x, y);
                }
            }).mouseenter(function (e) {
                e.preventDefault();

                if (leftDown) _this.onEnter(x, y);
                if (rightDown) _this.onRightEnter(x, y);
            }).bind('contextmenu', function (e) {
                e.preventDefault();
            });

            // Store the cell.
            _this.cellNodes[y * _this.iWidth + x] = c;
            c.appendTo(r);
        }(x - 1, y - 1));

        r.appendTo(t);
    }

    this.fill();

    t.appendTo(b);
    b.appendTo(this.node);

    return this.node;
};

/**
 * Get the cellStatus for the cell at the given coords.
 * If the cell is not accessable return CellStatus.INVALID as error value.
 * @tparm int x x-position of the cell.
 * @tparm int y y-position of the cell.
*/
Board.prototype.getCellStatus = function (x, y) {
    return this.history.getCurrent().get(x, y) || CellStatus.INVALID;
};

/**
 * Update the cellStatus and the node for the cell at the given coords.
 * @tparm int x x-position of the cell to set.
 * @tparm int y y-position of the cell to set.
 * @tparm CellStatus newStatus new Status of the cell.
 * @tparm Boolean addToHistory add the modification to the history if true.
 */
Board.prototype.setCellStatus = function (x, y, newStatus, addToHistory) {
    var newSnapshot = new Snapshot(this.history.getCurrent()),
        cellNode = this.cellNodes[y * this.iWidth + x],
        currentStatus = this.getCellStatus(x, y);

    // Update nodes.
    cellNode.removeClass(CellStatus.toClass(currentStatus));
    cellNode.addClass(CellStatus.toClass(newStatus));

    // Update history.
    if (addToHistory) {
        newSnapshot.set(x, y, newStatus);
        this.history.add(newSnapshot);
    }
};

/**
 * Set the SolutionSnapshot.
 * Generate hints on the table boarders.
 * @tparm SolutionSnapshot snapshot setter value for this.solution
 */
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

/**
 * remove the board from the page if it was added and null this.node.
 */
Board.prototype.removeNodes = function () {
    if (this.node !== null) {
        this.node.remove();
        this.node = null;
    }
};

/**
 * Set the nodes for the cells to the values in the current Snapshot from history
 * calls setCellStatus without modifing the history
 */
Board.prototype.fill = function () {
    for (y = 0; y < this.iHeight; ++y) {
        for (x = 0; x < this.iWidth; ++x) {
            this.setCellStatus(x, y, this.history.getCurrent().get(x, y), false);
        }
    }
};

/**
 * update the nodes to the previous Snapshot from history, if it exists.
 */
Board.prototype.prev = function () {
    this.history.prev();
    this.fill();
};

/**
 * update the nodes to the next Snapshot in history, if it exists.
 */
Board.prototype.next = function () {
    this.history.next();
    this.fill();
};

/**
 * @treturn Object return a serialized copy of this.
 */
Board.prototype.serialize = function () {
    return {
        width:   this.iWidth,
        height:  this.iHeight,
        history: this.history.serialize()
    };
};

/**
 * Restore this from the given serialized Object.
 * @tparm Object serialized Snapshot Object.
 */
Board.prototype.restore = function (serialized) {
    this.iWidth = serialized.width;
    this.iHeight = serialized.height;
    this.history.restore(serialized.history);
};

Board.prototype.onEnter = function (x, y) {};           ///< callBack when the mouse enters with leftClick
Board.prototype.onRightEnter = function (x, y) {};      ///< callBack when the mouse enters with rightClick
Board.prototype.onDragStart = function (x, y) {};       ///< callBack when the mouse starts dragging with leftClick
Board.prototype.onRightDragStart = function (x, y) {};  ///< callBack when the mouse starts dragging with rightClick
Board.prototype.onDragStop = function () {};            ///< callBack when the mousebutton is lifted after a leftClick drag
Board.prototype.onRightDragStop = function () {};       ///< callBack when the mousebutton is lifted after a rightClick drag
