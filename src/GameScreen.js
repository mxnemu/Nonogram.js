/**
 * GameScreen constructor
 */
function GameScreen() {
    Screen.call(this); // parent constructor
    $('#viewport').html('<div class="notice"><p>Please select a Puzzle &raquo;</p></div>');
    $('#controls').append(this.createOptionNode());
}

GameScreen.prototype = new Screen(); // inherit

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
                        + '<td><input name="game-next" type="button" value="next &raquo;" /></td>'
                    + '</tr>'
                + '</table>'
            + '</fieldset>'
        +'</div>'
    );

    this.optionNode.find('input[name="game-load"]').click(function() {
        var selection = _this.optionNode.find('select[name="editor-presets"]').val();
        if (selection) _this.loadPreset(selection, _this);
    });

    return this.optionNode;
}

Screen.prototype.save = function (name) {

};

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
