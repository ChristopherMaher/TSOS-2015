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
            // var thing = _Memory.makeTableHTML(this.memoryArray);
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
            //  this.amendTableHTML(this.memoryArray);
        };
        Memory.prototype.makeTableHTML = function (memoryarray) {
            //divMemory
            var tableDiv = document.getElementById("divMain");
            var table = document.getElementById('divMemory');
            //table.border = '1';
            var counter = 0;
            var tr, td, tn;
            var tableBody = document.getElementById('memDisplay');
            //table.appendChild(tableBody);
            var body = document.getElementsByTagName('body')[0];
            var tab = document.createElement('table');
            for (var row = 0; row < 32; row++) {
                tr = document.createElement('tr');
                for (var col = 0; col < 8; col++) {
                    td = document.createElement('td');
                    tn = document.createTextNode(memoryarray[counter]);
                    td.appendChild(tn);
                    tr.appendChild(td);
                    counter++;
                }
                tab.appendChild(tr);
            }
            body.appendChild(tab);
        };
        Memory.prototype.amendTableHTML = function (memoryarray) {
            var tableDiv = document.getElementById("divMain");
            var table = document.getElementById('divMemory');
            //table.border = '1';
            var counter = 0;
            var tr, td, tn;
            var body = document.getElementById('memDisplay');
            //table.appendChild(tableBody);
            // var body = document.getElementsByTagName('body')[0];
            var tab = document.getElementById('memDisplayBox');
            for (var row = 0; row < 32; row++) {
                tab.deleteRow();
            }
            for (var row = 0; row < 32; row++) {
                tr = document.createElement('tr');
                for (var col = 0; col < 8; col++) {
                    td = document.createElement('td');
                    tn = document.createTextNode(memoryarray[counter]);
                    td.appendChild(tn);
                    tr.appendChild(td);
                    counter++;
                }
                tab.appendChild(tr);
            }
            body.appendChild(tab);
        };
        return Memory;
    })();
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
