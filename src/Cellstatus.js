/**
 * Store the status of one Cell
 * @ctor
 * Constructor.
 * Set the status to the given String.
 * @tparm String type A Constant that will set this.type if invalid it is set to
 *        CellStatus.UNDEFINED
 */
// TODO may just store String constants instead of having a function
function CellStatus(type) {
    this.type = type;
    if (!this.validate()) {
        this.type = CellStatus.UNDEFINED;
    }
}
/**
 * Validate the type of this object, when no parameter is given,
 * otherwise check if the given string is a valid constant.
 */
CellStatus.prototype.validate = function(type) {
    if (!type) {
        type = this.type;
    }
        
    if (CellStatus.ACTIVE === type || CellStatus.INACTIVE === type) {
        return true;
    }
    return false;
}

CellStatus.ACTIVE    = "Active";
CellStatus.INACTIVE  = "InActive";
CellStatus.UNDEFINED = "Undefined";
