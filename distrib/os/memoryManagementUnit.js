/**
 * Created by Chris on 10/17/15.
 */
///<reference path="../globals.ts" />
var TSOS;
(function (TSOS) {
    var MemoryManagementUnit = (function () {
        function MemoryManagementUnit() {
        }
        MemoryManagementUnit.prototype.loadInCommand = function (userCommand) {
            var userProgramArray = userCommand.split(" ");
            _StdOut.putText(JSON.stringify(userProgramArray));
            var counter = 0;
            while (counter < userProgramArray.length) {
                _Memory.memoryArray[counter] = userProgramArray[counter];
                counter++;
            }
        };
        MemoryManagementUnit.prototype.getMemory = function (programCounter) {
            return parseInt(_Memory.memoryArray[programCounter], 16);
        };
        MemoryManagementUnit.prototype.storeMemory = function (address, value) {
            value = JSON.stringify(value);
            if (value.length === 1) {
                _Memory.memoryArray[address] = "0".concat(value);
            }
            else {
                _Memory.memoryArray[address] = value;
            }
        };
        MemoryManagementUnit.prototype.getAddress = function (programCounter) {
            var firstHalfOfLocation = _Memory.memoryArray[programCounter];
            //captures the second half of the location to store the ACC
            var secondHalfofLocation = _Memory.memoryArray[programCounter++];
            //var number = parseInt(fulllocation, 16);
            var fulllocation = firstHalfOfLocation.concat(secondHalfofLocation);
            if (firstHalfOfLocation !== "00") {
                return parseInt(firstHalfOfLocation, 16);
            }
            else {
                return parseInt(fulllocation, 16);
            }
        };
        return MemoryManagementUnit;
    })();
    TSOS.MemoryManagementUnit = MemoryManagementUnit;
})(TSOS || (TSOS = {}));
