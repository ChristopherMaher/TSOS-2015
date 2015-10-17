/**
 * Created by Chris on 10/17/15.
 */
///<reference path="../globals.ts" />
var TSOS;
(function (TSOS) {
    var MMU = (function () {
        function MMU() {
        }
        MMU.prototype.loadInCommand = function (userCommand) {
            _Memory.createMemoryArray(userCommand);
        };
        return MMU;
    })();
    TSOS.MMU = MMU;
})(TSOS || (TSOS = {}));
