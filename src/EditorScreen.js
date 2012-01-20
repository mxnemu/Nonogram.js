/**
 * EditorScreen constructor
 */
function EditorScreen() {
    Screen.call(this, new EditorBoard(10, 10)); // parent constructor
    this.optionNode = null;
    if (this.board) {
        $('#controls').append(this.createOptionNode());
    }
}

EditorScreen.prototype = new Screen(); // inherit

/**
 * creates the dom nodes for the option panel
 */
EditorScreen.prototype.createOptionNode = function() {
    var _this = this;

    var sPresetNonograms = window.localStorage.getItem("presetNonograms");
    if (!sPresetNonograms || sPresetNonograms == "" || sPresetNonograms == "null") {
        sPresetNonograms = _this.getPresetGames();
        window.localStorage.setItem("presetNonograms", sPresetNonograms);
    }
    var aPresetNonograms = JSON.parse(sPresetNonograms);

    var sSelectBox = '<select size="10" name="editor-presets">';
    $.each(aPresetNonograms, function(key) {
        sSelectBox += '<option>' + key + '</option>';
    });
    sSelectBox += '</select>';

    this.optionNode = $(
          '<div>'
            + '<fieldset>'
                + '<legend>Create</legend>'
                + '<table>'
                    + '<tr><th>Width</th><td><input name="editor-width" type="text" value="10" /></td></tr>'
                    + '<tr><th>Height</th><td><input name="editor-height" type="text" value="10" /></td></tr>'
                + '</table>'
                + '<input name="editor-create" type="button" value="create" />'
            + '</fieldset>'
            + '<fieldset>'
                + '<legend>Save</legend>'
                + '<table>'
                    + '<tr><th>Name</th><td><input name="editor-gamename" type="text" /></td></tr>'
                + '</table>'
                + '<input name="editor-save" type="button" value="save" />'
            + '</fieldset>'
            + '<fieldset>'
                + '<legend>Load</legend>'
                + sSelectBox
                + '<input name="editor-load" type="button" value="load" />'
            + '</fieldset>'
        + '</div>'
    );

    this.optionNode.find('input[name="editor-create"]').click(function () {
        var width = parseInt(_this.optionNode.find('input[name="editor-width"]').val(), 10),
            height = parseInt(_this.optionNode.find('input[name="editor-height"]').val(), 10);

        if (!isNaN(width) && !isNaN(height)) {
            _this.setBoard(new EditorBoard(width, height));
            _this.redraw();
        }
    });

    this.optionNode.find('input[name="editor-save"]').click(function() {
        _this.save(_this.optionNode.find('input[name="editor-gamename"]').val(), _this);
        _this.destroyOptionNode();
        $('#controls').append(_this.createOptionNode());
    });

    this.optionNode.find('input[name="editor-load"]').click(function() {
        var selection = _this.optionNode.find('select[name="editor-presets"]').val();
        if (selection) _this.load(selection, _this);
    });

    return this.optionNode;
}

/**
 * save
 */
EditorScreen.prototype.save = function (name) {
    if (this.board === null) throw "Could not save `" + name + "'.";
    var sPresetNonograms = window.localStorage.getItem("presetNonograms");
    if (!sPresetNonograms || sPresetNonograms == "") {
        sPresetNonograms = "{}";
    }

    var aPresetNonograms = JSON.parse(sPresetNonograms);
    aPresetNonograms[name] = this.board.serialize();
    window.localStorage.setItem("presetNonograms", JSON.stringify(aPresetNonograms));
}

/**
 * load
 */
EditorScreen.prototype.load = function (name) {
    var aPresetNonograms = JSON.parse(window.localStorage.getItem("presetNonograms"));
    var serialized = aPresetNonograms[name];
    if (!serialized) throw "Could not load `" + name + "'.";
    this.board.restore(serialized);
    this.redraw();
}

