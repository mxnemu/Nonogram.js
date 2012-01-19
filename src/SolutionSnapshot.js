function SolutionSnapshot() {
    Snapshot.apply(this, Array.prototype.slice.call(arguments)); // parent constructor
}

SolutionSnapshot.prototype = new Snapshot(); // inherit

