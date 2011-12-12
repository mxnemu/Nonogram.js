/**
 * The Snapshot stores the status of all cells on a board.
 * It represents the board at a specific turn.
 * @ctor
 * Constructor.
 * Either take 2 Numbers for dimensions or one Snapshot to copy
 */
function Snapshot(arg1, arg2) {
    if (typeof(arg1) == "number" && typeof(arg1) == "number") {
        var width  = arg1;
        var height = arg2;
        // create 2 dimensional array
        this.cells = new Array(height);
        for (var y=0; y < height; ++y) {
            this.cells[y] = new Array(width);
        }
    } else if (typeof(arg1) == "object") {
        this.cells = arg1.cells;
    } else {
        this.cells = null;
    }
}

/**
 * @treturn boolean return true if cells are equally set
 */
Snapshot.prototype.isEqual = function(otherSnapshot) {
    return otherSnapshot.cells == this.cells;
}

/**
 * @treturn boolean return true if the required cells are marked as sure
 */
Snapshot.prototype.isValid = function(solutionSnapshot) {

}

/**
 *  set the status of the cell for the given coords
 */
Snapshot.prototype.set = function(x, y, status) {
    return this.cells[y][x] = status;
}

/**
 * @treturn CellStatus at the given coords
 */
Snapshot.prototype.get = function(x, y) {
    return this.cells[y][x];
}

/**
 *  create the DOM-Nodes for this Snapshot
 */
Snapshot.prototype.createNodes = function() {

}

/**
 *  update the DOM-Nodes for this Snapshot
 */
Snapshot.prototype.updateNodes = function() {

}

/**
 *  remove the DOM-Nodes for this Snapshot from this document
 */
Snapshot.prototype.removeNodes = function() {

}
