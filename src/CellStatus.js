/**
 * Store the status of one Cell.
 */
var CellStatus = {
    INVALID:  0,
    ACTIVE:   1,
    INACTIVE: 2,

    toClass: function (status) {
        return status == CellStatus.INVALID ? '' : 'cell-status-' + status;
    }
};
