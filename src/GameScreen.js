/**
 * GameScreen constructor
 */
function GameScreen() {
    Screen.call(this, new GameBoard(10, 10)); // parent constructor
    if (this.board) {
        $('#controls').append(this.createOptionNode());
    }
}

GameScreen.prototype = new Screen(); // inherit

GameScreen.prototype.createOptionNode = function() {

    var sPresetNonograms = window.localStorage.getItem("presetNonograms");
    var _this = this;
    if (!sPresetNonograms || sPresetNonograms == "") {
        sPresetNonograms = "{}";
    }
    var aPresetNonograms = JSON.parse(sPresetNonograms);

    var sSelectBox = "<select size='5' name='editor-presetMapList' id='editor-presetMapList'>";
    $.each(aPresetNonograms, function(key) {
        sSelectBox += "<option>" + key + "</option>";
    });
    sSelectBox += "</select>";

    this.optionNode = $(
        '<div class="option-node">'
            + '<h2>GAME</h2>'
            + '<fieldset>'
                + '<legend>Load</legend>'
                + sSelectBox
                + '<input name="game-load" type="button" value="load" />'
            + '</fieldset>'
            + '<fieldset>'
                + '<legend>Utility</legend>'
                + '<input name="game-fill" type="button" value="fill rest with white" />'
            + '</fieldset>'
        +'</div>'
    );

    this.optionNode.find('input[name="game-load"]').click(function() {
        _this.loadPreset(_this.optionNode.find('select[name="editor-presetMapList"]').val(), _this);
    });

    this.optionNode.find('input[name="game-fill"]').click(function() {
        _this.board.fill();
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
