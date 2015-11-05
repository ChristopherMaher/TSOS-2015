/**
 * Created by Chris on 10/17/15.
 */
///<reference path="../globals.ts" />
var TSOS;
(function (TSOS) {
    var MemoryManagementUnit = (function () {
        function MemoryManagementUnit() {
        }
        MemoryManagementUnit.prototype.loadInCommand = function (userCommand, base) {
            userCommand = userCommand.replace(/\r?\n|\r/g, "");
            var userProgramArray = userCommand.split(" ");
            var counter = 0;
            while (counter < userProgramArray.length) {
                _Memory.memoryArray[base + counter] = userProgramArray[counter];
                //_StdOut.putText(_Memory.memoryArray[counter]);
                counter++;
            }
            TSOS.Control.loadTable();
        };
        MemoryManagementUnit.prototype.getMemory = function (programCounter) {
            return parseInt(_Memory.memoryArray[programCounter], 16);
        };
        MemoryManagementUnit.prototype.getCommamd = function (programCounter) {
            return _Memory.memoryArray[programCounter];
        };
        MemoryManagementUnit.prototype.storeMemory = function (address, value) {
            //value = JSON.stringify(value);
            // if(value.length === 1) {
            //   value = "0".concat(value);
            // _Memory.memoryArray[address] = value.toString(16);
            //  }else{
            _Memory.memoryArray[address] = value.toString(16);
            //  _StdOut.putText(value.toString(16));
            //_StdOut.putText(value);
            //}
            TSOS.Control.loadTable();
        };
        MemoryManagementUnit.prototype.getAddress = function (programCounter) {
            //ADD check for base and limit
            var firstHalfOfLocation = _Memory.memoryArray[programCounter];
            //captures the second half of the location to store the ACC
            var secondHalfofLocation = _Memory.memoryArray[programCounter++];
            //var number = parseInt(fulllocation, 16);
            var fulllocation = firstHalfOfLocation.concat(secondHalfofLocation);
            if (firstHalfOfLocation !== "00") {
                return parseInt(firstHalfOfLocation, 16) + _PIDArray[_RuningPIDs[0]].base;
            }
            else {
                return parseInt(fulllocation, 16);
            }
        };
        // add base and limit for memory reset to find its bounds in memory
        MemoryManagementUnit.prototype.resetMemory = function (base, limit) {
            for (var i = base; i < limit; i++) {
                _Memory.memoryArray[i] = "00";
            }
        };
        MemoryManagementUnit.prototype.findAvailableBase = function () {
            if (_AvailableBaseTracker[0] === true) {
                _AvailableBaseTracker[0] = false;
                return 0;
            }
            else if (_AvailableBaseTracker[1] === true) {
                _AvailableBaseTracker[1] = false;
                return 256;
            }
            else if (_AvailableBaseTracker[2] === true) {
                _AvailableBaseTracker[2] = false;
                return 512;
            }
            else {
                return 2;
            }
        };
        MemoryManagementUnit.prototype.resetBaseAvailablity = function (base) {
            if (base === 0) {
                _AvailableBaseTracker[0] = true;
            }
            else if (base === 256) {
                _AvailableBaseTracker[1] = true;
            }
            else if (base === 512) {
                _AvailableBaseTracker[2] = true;
            }
        };
        return MemoryManagementUnit;
    })();
    TSOS.MemoryManagementUnit = MemoryManagementUnit;
})(TSOS || (TSOS = {}));
