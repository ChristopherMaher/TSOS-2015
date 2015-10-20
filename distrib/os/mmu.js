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
            var userProgramArray = userCommand.split(" ");
            _StdOut.putText(JSON.stringify(userProgramArray));
            var counter = 0;
            while (counter < userProgramArray.length) {
                _Memory.memoryArray[counter] = userProgramArray[counter];
                counter++;
            }
            // public loadMemoryTable(){
            //  }
            //  this.loadTable();
        };
        return MMU;
    })();
    TSOS.MMU = MMU;
})(TSOS || (TSOS = {}));
