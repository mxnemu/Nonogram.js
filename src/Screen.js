function Screen(board) {
    this.board = board || null;
    this.redraw();
}

Screen.prototype.redraw = function () {
    if (this.board !== null) {
        this.board.removeNodes();
        $('#playground').append(this.board.createNodes());
    }
};

Screen.prototype.save = function (name) {
    if (this.board === null) throw "Could not save `" + name + "'.";
    var sPresetNonograms = window.localStorage.getItem("presetNonograms");
    if (!sPresetNonograms || sPresetNonograms == "") {
        sPresetNonograms = "{}";
    }
    
    var aPresetNonograms = JSON.parse(sPresetNonograms);
    aPresetNonograms[name] = this.board.serialize();
    window.localStorage.setItem("presetNonograms", JSON.stringify(aPresetNonograms));
};

Screen.prototype.load = function (name) {
    var aPresetNonograms = JSON.parse(window.localStorage.getItem("presetNonograms"));
    var serialized = aPresetNonograms[name];
    if (!serialized) throw "Could not load `" + name + "'.";
    this.board.restore(serialized);
    this.redraw();
};
