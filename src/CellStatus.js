/**
 * Store the status of one Cell.
 */
var CellStatus = {
    INVALID:  0,
    TAGGED:   1,
    ACTIVE:   2,
    INACTIVE: 3,

    toClass: function (status) {
        return 'cell-status-' + status;
    }
};
