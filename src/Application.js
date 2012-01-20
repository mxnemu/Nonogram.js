/**
 * Application constructor
 */
function Application() {
    if (window.location.hash == "#editor") {
        this.screen = new EditorScreen();
    } else {
        this.screen = new GameScreen();
    }
    
}
