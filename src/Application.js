/**
 * Application constructor
 */
function Application() {
    /** for tests only, remove this! */
    var oBoard = new Board(10, 10);
    $('#playground').append(oBoard.createNodes());
}




/**
 * Saves a game under a name.
 *
 * @param String sName game name
 * @param Object oGame game object
 */
Application.prototype.save = function (sName, oGame) {
    
};




/**
 * Returns a game by name.
 *
 * @param String sName game name
 * @return Object game object
 */
Application.prototype.load = function (sName) {

};
