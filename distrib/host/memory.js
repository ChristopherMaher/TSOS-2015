///<reference path="../globals.ts" />
var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory() {
            this.memoryArray = new Array(256);
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
            for (var i = 0; i < 256; i++) {
                this.memoryArray[i] = "00";
            }
            //_Memory.makeTableHTML(this.memoryArray);
        };
        return Memory;
    })();
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
