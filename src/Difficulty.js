/**
 * Store the difficulty of a game.
 * @param String sType Values are 'EASY', 'MEDIUM' or 'HARD', default value is 'EASY'.
 */
function Difficulty(sType) {
    
    /** private String sEASY */
    var sEASY =     'EASY';
    
    /** private String sMEDIUM */
    var sMEDIUM =   'MEDIUM';
    
    /** private String sHARD */
    var sHARD =     'HARD';
    
    /** private String sDEFAULT */
    var sDEFAULT =  sEASY;
    
    
    
    
    /**
     * private function validate
     * validates the given type
     * @param String sType
     * @return Boolean
     */
    function validate(sType) {
        return (typeof sType == 'string' && ( sEASY == sType.toUpperCase() || sMEDIUM == sType.toUpperCase() || sHARD == sType.toUpperCase() ));
    }
    
    
    
    
    /** set public difficulty type */
    this.sType = (validate(sType)? sType.toUpperCase() : sDEFAULT);
    
}
