/**
 * The Snapshot stores the status of all cells on a board.
 * It represents the board at a specific turn.
 * @ctor
 * Constructor.
 * Either take 2 Numbers for dimensions or one Snapshot to copy
 * see: blog.dezfowler.com/2008/08/function-overloading-in-javascript.html
 */
function Snapshot(arg1, arg2) {
    Widget.call(this); // parent constructor

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

Snapshot.prototype = new Widget(); // inherit

/**
 * @treturn boolean return true if cells are equally set
 */
Snapshot.prototype.isEqual = function(otherSnapshot) {
    return otherSnapshot.cells == this.cells;
};

/**
 * @treturn boolean return true if the required cells are marked as sure
 */
Snapshot.prototype.isValid = function(solutionSnapshot) {
    return this.cells == solutionSnapshot.cells;
};

/**
 * @tparm Number x Either take x coord or and id, than y mus be 0
 * @tparm Number y y coord of the cell set to null if you want to use x as id
 *  set the status of the cell for the given coords
 */
Snapshot.prototype.set = function(x, y, status) {
    if (y == null) {
        var id = x;
        y = id % this.cells.length;
        x = id - y;
    }
    return this.cells[y][x] = status;
};

/**
 * @tparm Number x Either take x coord or and id, than y mus be 0
 * @tparm Number y y coord of the cell set to null if you want to use x as id
 * @treturn CellStatus at the given coords
 */
Snapshot.prototype.get = function(x, y) {
    if (y == null) {
        var id = x;
        y = id % this.cells.length;
        x = id - y;
    }
    return this.cells[y][x];
};

/**
 *  create the DOM-Nodes for this Snapshot
 */
Snapshot.prototype.createNodes = function() {

};

/**
 *  remove the DOM-Nodes for this Snapshot from this document
 */
Snapshot.prototype.removeNodes = function() {

};
