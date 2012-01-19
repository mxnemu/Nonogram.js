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

    if (args.length == 2 && $.isNumeric(args[0]) && $.isNumeric(args[1])) {
        // Handle regular construction (dimensions).
        this.width = args[0];
        this.height = args[1];
        this.cells = [];

        // Initialize all cells.
        for (y = 0; y < this.width; ++y) {
            for (x = 0; x < this.height; ++x) {
                this.cells[y * this.width + x] = CellStatus.INVALID;
            }
        }
    } else if (args.length == 1 && args[0] instanceof Snapshot) {
        // Copy all relevant values.
        this.width = args[0].width;
        this.height = args[0].height;
        this.cells = args[0].cells.slice(0);
    }
}

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
Snapshot.prototype.isValid = function(solutionSnapshot, changeX, changeY) {
    var valid = true,
		solution = window.APP.oGame.solution,
		lineX, lineY;
	
	createLines(changeX, changeY);
	valid = lineIsValid(lineX);
	valid = lineIsValid(lineY);
	
	return valid;	
	
	function createLines (changeX, changeY) {
		var x, y;
		
		lineX = [];
		lineY = [];
		for (y = 0; y < this.height; y += 1) {
			lineX.push(this.get(changeX, y));
		}
		for (x = 0; x < this.width; x += 1) {
			lineY.push(this.get(changeY, x));
		}
	}

	function lineIsValid (line) {
		
	}
};

Snapshot.prototype.set = function(x, y, status) {
    this.cells[y * this.width + x] = status;
};

Snapshot.prototype.get = function(x, y) {
    return this.cells[y * this.width + x] || CellStatus.INVALID;
};
