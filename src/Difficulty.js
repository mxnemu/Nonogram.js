/**
 * Store the difficulty of a game.
 * @param String sType Values are 'Easy', 'Medium' or 'Hard', default value is 'Easy'.
 */
function Difficulty(sType) {
    
    /** private String sDefault */
    var sDefault =  'Easy';
    
    /** private String sEasy */
    var sEasy =     'Easy';
    
    /** private String sMedium */
    var sMedium =   'Medium';
    
    /** private String sHard */
    var sHard =     'Hard';
    
    /**
     * private validate
     * validates the given type
     * @param String sType
     * @return Boolean
     */
    function validate(sType) {
        return (typeof sType == 'string' && ( sEasy === sType || sMedium === sType || sHard === sType ));
    }
    
    /** set difficulty type */
    this.sType = (validate(sType)? sType : sDefault);
}

//myDiff = new Difficulty(123456);
//console.log(myDiff);
