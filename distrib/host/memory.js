///<reference path="../globals.ts" />
var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory() {
            this.memoryArray = new Array(255);
        }
        Memory.prototype.init = function () {
            for (var i = 0; i < 255; i++) {
                this.memoryArray[i] = "00";
            }
        };
        Memory.prototype.createMemoryArray = function (userProgram) {
            var userProgramArray = userProgram.split(" ");
            var counter = 0;
            while (counter < userProgramArray.length) {
                this.memoryArray[counter] = userProgramArray[counter];
                counter++;
            }
            //  this.memoryArray[i] = "00";
            /*
            this.memoryArray[i] = new Array(8);
            for (var x = 0; x < 8; x++) {

                if(counter<userProgramArray.length) {
                    this.memoryArray[i][x] = userProgramArray[counter];
                    counter++

                }else{
                    this.memoryArray[i][x] =0;
                }

            }
             */
            // }
        };
        return Memory;
    })();
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
