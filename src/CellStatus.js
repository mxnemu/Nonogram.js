/**
 * Store the status of one Cell.
 */
var CellStatus = {
    INVALID:  0,
    ACTIVE:   1,
    INACTIVE: 2,

    toClass: function (status) {
        return status == CellStatus.INVALID ? '' : 'cell-status-' + status;
    },

    fromClass: function (className) {
        var matches = className.match(/\bcell\-status\-(\d+)\b$/),
            id;

        if (matches.length == 0) return CellStatus.INVALID;
        id = parseInt(matches[1], 10);
        if (isNaN(id)) return CellStatus.INVALID;

        return id;
    }
};
