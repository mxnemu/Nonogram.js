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
    if (!sPresetNonograms || sPresetNonograms == "") {
        sPresetNonograms = "{}";
    }
    var aPresetNonograms = JSON.parse(sPresetNonograms);
    
    window.localStorage
    var sSelectBox = "<select size='5' name='editor-presetMapList' id='editor-presetMapList'>";
    $.each(aPresetNonograms, function(key) {
        sSelectBox += "<option>" + key + "</option>";
    });
    sSelectBox += "</select>";
    
    this.optionNode = $(
          '<div class="option-node" id="option-node-editor">'
            + '<h2>EDITOR</h2>'
            + '<fieldset>'
                + '<legend>Create</legend>'
                + '<table>'
                    + '<tr><th>Width</th><td><input name="editor-width" type="text" /></td></tr>'
                    + '<tr><th>Height</th><td><input name="editor-height" type="text" /></td></tr>'
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

    this.optionNode.find('input[name="editor-save"]').click(function() {
        _this.save(_this.optionNode.find('input[name="editor-gamename"]').val(), _this);
    });
    
    this.optionNode.find('input[name="editor-load"]').click(function() {
        _this.load(_this.optionNode.find('select[name="editor-presetMapList"]').val(), _this);
    });

    return this.optionNode;
}

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

EditorScreen.prototype.load = function (name) {
    var aPresetNonograms = JSON.parse(window.localStorage.getItem("presetNonograms"));
    var serialized = aPresetNonograms[name];
    if (!serialized) throw "Could not load `" + name + "'.";
    this.board.restore(serialized);
    this.redraw();
}

