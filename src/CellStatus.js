/**
 * Store the status of one Cell.
 */
var CellStatus = {
    INVALID:  0,
    ACTIVE:   1,
    INACTIVE: 2,
    TAGGED:   3,

    toClass: function (status) {
        return 'cell-status-' + status;
    }
};
