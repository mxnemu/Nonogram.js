/**
 * GameScreen constructor
 */
function GameScreen() {
    Screen.call(this); // parent constructor
    $('#viewport').html('<div class="notice"><p>Please select a Puzzle &raquo;</p></div>');
    $('#controls').append(this.createOptionNode());
}

GameScreen.prototype = new Screen(); // inherit

/**
 * Create the DOM in the #options div.
 * TODO: move the code creating the default presets out of here.
 */
GameScreen.prototype.createOptionNode = function() {

    var sPresetNonograms = window.localStorage.getItem("presetNonograms");
    var _this = this;
    if (!sPresetNonograms || sPresetNonograms == "" || sPresetNonograms == "null") {
        sPresetNonograms = "{}";
    }
    var aPresetNonograms = JSON.parse(sPresetNonograms);
/*    if (!aPresetNonograms || !aPresetNonograms.length) {
        sPresetNonograms = _this.getPresetGames();
        window.localStorage.setItem("presetNonograms", sPresetNonograms);
        aPresetNonograms = JSON.parse(sPresetNonograms);
    }
*/
    var sSelectBox = '<select size="10" name="editor-presets">';
    $.each(aPresetNonograms, function(key) {
        sSelectBox += '<option>' + key + '</option>';
    });
    sSelectBox += '</select>';

    this.optionNode = $(
        '<div>'
            + '<fieldset>'
                + '<legend>Load</legend>'
                + sSelectBox
                + '<input name="game-load" type="button" value="load" />'
            + '</fieldset>'
            + '<fieldset>'
                + '<legend>History</legend>'
                + '<table>'
                    + '<tr>'
                        + '<td><input name="game-prev" type="button" value="&laquo; prev" /></td>'
                        //+ '<td><input name="game-next" type="button" value="next &raquo;" /></td>'
                    + '</tr>'
                + '</table>'
            + '</fieldset>'
        +'</div>'
    );

    this.optionNode.find('input[name="game-prev"]').click(function () {
        _this.board.prev();
    });
    this.optionNode.find('input[name="game-next"]').click(function () {
        _this.board.next();
    });

    this.optionNode.find('input[name="game-load"]').click(function() {
        var selection = _this.optionNode.find('select[name="editor-presets"]').val();
        if (selection) _this.loadPreset(selection, _this);
    });

    return this.optionNode;
}

/**
 * TODO: save in the savegames map in localStorage with the given name.
 */
Screen.prototype.save = function (name) {

};

/**
 * Load a board with the given name from the "presetNonograms" map that is stored in localStorage.
 * Set and redraw the board and update the solution.
 */
Screen.prototype.loadPreset = function (name) {
    var aPresetNonograms = JSON.parse(window.localStorage.getItem("presetNonograms"));
    var serialized = aPresetNonograms[name];
    if (!serialized) throw "Could not load `" + name + "'.";

    var oSolutionBoard = new Board();
    oSolutionBoard.restore(serialized);
    this.redraw();
    this.setBoard(new GameBoard(oSolutionBoard.iWidth, oSolutionBoard.iHeight));
    this.redraw();
    this.board.setSolution(oSolutionBoard.history.getCurrent());
};
