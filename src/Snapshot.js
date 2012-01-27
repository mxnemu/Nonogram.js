/**
 * The Snapshot stores the status of all cells on a board. It represents the
 * board at a specific moment in time.
 *
 * @ctor
 */
function Snapshot() {
    var args = Array.prototype.slice.call(arguments),
        x,
        y;

    if (args.length == 1 && args[0] instanceof Snapshot) {
        // Copy all relevant values.
        this.width = args[0].width;
        this.height = args[0].height;
        this.cells = args[0].cells.slice(0);
    } else if (args.length >= 2 && $.isNumeric(args[0]) && $.isNumeric(args[1])) {
        // Handle regular construction (dimensions).
        this.width = args[0];
        this.height = args[1];
        this.cells = [];

        // Initialize all cells.
        for (y = 0; y < this.height; ++y) {
            for (x = 0; x < this.width; ++x) {
                this.cells[y * this.width + x] = args[2] || CellStatus.INVALID;
            }
        }
    }
}

/*
 * @tparm Snapshot other other board to compare this with.
 * @treturn Boolean return true if the cells of this.cells are exactly equal with the cells of other.
 */
Snapshot.prototype.isEqual = function (other) {
    if (this.width != other.width || this.height != other.height) return false;

    for (var i = 0; i < this.width * this.height; ++i) {
        if (this.cells[i] != other.cells[i]) return false;
    }

    return true;
};

/**
 * @treturn boolean return true if the required cells are marked as sure
 */
Snapshot.prototype.isValid = function(solution) {
    var x, y,
        cell,
        valid = true;

    for (y = 0; y < this.height; y += 1) {
        for (x = 0; x < this.width; x += 1) {
            cell = this.cells[x][y];
            if ( cell !== CellStatus.TAGGED && cell !== solution.cells[x][y]) {
                valid = false;
                break;
            }
        }
        if (!valid)
            break;
    }
    return valid;
};

/*
 * Change the status of the cell at the given coords.
 * @tparm int x x-position of the cell to change.
 * @tparm int y y-position of the cell to change.
 * @tparm CellStatus new status that the cell shall receive.
 */
Snapshot.prototype.set = function(x, y, status) {
    this.cells[y * this.width + x] = status;
};

/*
 * Get the Cellstatus of the cell at the given coords
 * @tparm x x-position of the cell.
 * @tparm y y-position of the cell.
 */
Snapshot.prototype.get = function(x, y) {
    return this.cells[y * this.width + x] || CellStatus.INVALID;
};

/*
 * @treturn Object return a serialized copy of this.
 */
Snapshot.prototype.serialize = function() {
    return {
        width: this.width,
        height: this.height,
        cells: this.cells
    };
};
/*
 * Restore this from the given serialized Object.
 * @tparm Object serialized Snapshot Object.
 */
Snapshot.prototype.restore = function(serialized) {
    this.width = serialized.width;
    this.height = serialized.height;
    this.cells = serialized.cells;
};
