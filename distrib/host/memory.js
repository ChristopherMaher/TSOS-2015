///<reference path="../globals.ts" />
var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory() {
            //768
            this.memoryArray = new Array(768);
        }
        // public displayArray = new Array[32];
        //public innerDisplayArray = new Array[8];
        //public counter2 = 0;
        Memory.prototype.init = function () {
            /*
             for (var i = 0; i < 32; i++) {
                 this.displayArray[i] = this.innerDisplayArray;
                    for(var x = 0; x < 8; x++){
                        this.innerDisplayArray[x] = "0";
                    }
             }
             */
            var baseNumber = 0;
            var counter = 0;
            while (counter < 3) {
                _AvailableBaseTracker[counter] = true;
                // baseNumber + 256;
                counter++;
            }
            for (var i = 0; i < 768; i++) {
                this.memoryArray[i] = "00";
            }
            //    _Memory.makeTableHTML(this.memoryArray);
        };
        return Memory;
    })();
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
