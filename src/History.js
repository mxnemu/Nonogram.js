/**
 * Store a history of Snapshots, one for each turn the player takes.
 * @ctor
 * Constructor.
 * creates Empy arrays
 */
function History() {
    Widget.call(this); // parent constructor

    this.snapshots = new Array();
    this.currentOffset = 0;
    this.trackNodes = new Array();

//TODO not sure if solution is required in this class. It's in the UML.
//    this.solution = null;
}

History.prototype = new Widget(); // inherit

/**
 * Set the currentOffset if the given value is a valid index in this.snapshots
 */
History.prototype.jumpTo = function(offset) {
    if (offset < this.snapshots.length) {
        this.currentOffset = offset;
    }
}

/**
 * @treturn Snapshot Return the current Snapshot
 */
History.prototype.getCurrent = function() {
    if (this.currentOffset < this.snapshots.length) {
        return this.snapshots[this.currentOffset];
    }
    return null;
}


/**
 * push a Snapshot to the history and increase the currentOffset
 */
History.prototype.add = function(snapshot) {
    if (snapshot) {
        this.snapshots.push(snapshot);
        this.currentOffset++;
    }
}

/**
 * Add a tracknode at the current offset
 */
History.prototype.track = function(trackNodeName) {
    this.trackNodes[trackNodeName] = this.currentOffset;
}


/**
 * Remove the trackNode with the given name
 */
History.prototype.untrack = function(trackNodeName) {
    this.trackNodes[trackNodeName] = undefined;
}

/**
 * jumpTo the offset stored for the given trackNodeName
 */
History.prototype.rollback = function(trackNodeName) {
    var offset = this.trackNodes[trackNodeName];
    if (offset != undefined) {
        jumpTo(offset);
    }
}

/**
 *  create the DOM-Nodes for the current Snapshot
 */
History.prototype.createNodes = function() {
    var current = this.getCurrent();
    if (current) {
        current.createNodes();
    }
}

/**
 *  remove the DOM-Nodes for the current Snapshot from this document
 */
History.prototype.removeNodes = function() {
    var current = this.getCurrent();
    if (current) {
        current.removeNodes();
    }
}
