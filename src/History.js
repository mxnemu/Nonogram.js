/**
 * Store a history of Snapshots, one for each turn the player takes.
 * @ctor
 * Constructor.
 * creates Empy arrays
 */
function History() {
    this.snapshots = new Array();
    this.currentOffset = -1;
    this.trackNodes = new Array();
}

History.prototype.serialize = function() {
    var aSerializedSnapshots = new Array();
    $.each(this.snapshots, function() {
        aSerializedSnapshots.push(this.serialize());
    });
    return {
        currentOffset: this.currentOffset,
        snapshots: aSerializedSnapshots,
        trackNodes: this.trackNodes
    }
}

History.prototype.restore = function(serialized) {
    var _this = this;
    this.currentOffset = serialized.currentOffset;
    this.trackNodes = serialized.trackNodes;
    this.snapshots = new Array();
    $.each(serialized.snapshots, function() {
        var snapshot = new Snapshot();
        snapshot.restore(this);
        _this.snapshots.push(snapshot);
    });
}

/**
 * Set the currentOffset if the given value is a valid index in this.snapshots
 */
History.prototype.jumpTo = function(offset) {
    if (offset < this.snapshots.length) {
        this.currentOffset = offset;
    }
}

History.prototype.prev = function () {
    if (this.currentOffset > 0) {
        this.jumpTo(this.currentOffset - 1);
    }
};

History.prototype.next = function () {
    if (this.currentOffset < this.snapshots.length - 1) {
        this.jumpTo(this.currentOffset + 1);
    }
};

/**
 * @treturn Snapshot Return the current Snapshot
 */
History.prototype.getCurrent = function() {
    if (this.currentOffset != -1 && this.currentOffset < this.snapshots.length) {
        return this.snapshots[this.currentOffset];
    }

    return null;
}

/**
 * push a Snapshot to the history and increase the currentOffset
 */
History.prototype.add = function(snapshot) {
    if (!snapshot) return;

    if (this.currentOffset < this.snapshots.length - 1) {
        this.snapshots = this.snapshots.slice(0, this.currentOffset);
        this.currentOffset = this.snapshots.length - 1;
    }
    
    this.snapshots.push(snapshot);
    this.currentOffset++;
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
