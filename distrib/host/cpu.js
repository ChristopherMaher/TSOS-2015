///<reference path="../globals.ts" />
/* ------------
     CPU.ts

     Requires global.ts.

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */
var TSOS;
(function (TSOS) {
    var Cpu = (function () {
        function Cpu(PC, Acc, Xreg, Yreg, Zflag, isExecuting) {
            if (PC === void 0) { PC = 0; }
            if (Acc === void 0) { Acc = 0; }
            if (Xreg === void 0) { Xreg = 0; }
            if (Yreg === void 0) { Yreg = 0; }
            if (Zflag === void 0) { Zflag = 0; }
            if (isExecuting === void 0) { isExecuting = false; }
            this.PC = PC;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.isExecuting = isExecuting;
        }
        Cpu.prototype.init = function () {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        };
        Cpu.prototype.cycle = function () {
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            var currentCommand = _Memory.memoryArray[this.PC];
            if (currentCommand == "A9") {
                this.PC++;
                currentCommand = _Memory.memoryArray[this.PC];
                this.Acc = parseInt(currentCommand);
                this.PC++;
            }
            else if (currentCommand == "8D") {
                this.PC++;
                //captures the first half of the location to store the ACC
                var firstHalfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                //captures the second half of the location to store the ACC
                var secondHalfLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfLocation.concat(secondHalfLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                _Memory.memoryArray[number] = JSON.stringify("0" + this.Acc);
                this.PC++;
            }
            else if (currentCommand === "00") {
                this.isExecuting = false;
            }
            else if (currentCommand == "AD") {
                this.PC++;
                var firstHalfOfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                var secondHalfofLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfLocation.concat(secondHalfLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                this.Acc = parseInt(_Memory.memoryArray[number]);
                this.PC++;
            }
            else if (currentCommand == "AC") {
                this.PC++;
                var firstHalfOfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                var secondHalfofLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfLocation.concat(secondHalfLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                this.Yreg = parseInt(_Memory.memoryArray[number]);
                this.PC++;
            }
            else if (currentCommand == "AE") {
                this.PC++;
                var firstHalfOfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                var secondHalfofLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfLocation.concat(secondHalfLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                this.Xreg = parseInt(_Memory.memoryArray[number]);
                this.PC++;
            }
            else if (currentCommand == "6D") {
                this.PC++;
                var firstHalfOfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                var secondHalfofLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfLocation.concat(secondHalfLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                this.Acc = parseInt(_Memory.memoryArray[number]) + this.Acc;
                this.PC++;
            }
            else if (currentCommand == "A2") {
                this.PC++;
                this.Xreg = parseInt(_Memory.memoryArray[this.PC]);
                this.PC++;
            }
            else if (currentCommand == "A0") {
                this.PC++;
                this.Yreg = parseInt(_Memory.memoryArray[this.PC]);
                this.PC++;
            }
            else if (currentCommand == "EC") {
                this.PC++;
                var firstHalfOfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                var secondHalfofLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfLocation.concat(secondHalfLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                if (this.Xreg === parseInt(_Memory.memoryArray[number])) {
                    this.Xreg = 1;
                }
                this.PC++;
            }
            else if (currentCommand == "EE") {
                this.PC++;
                var firstHalfOfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                var secondHalfofLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfLocation.concat(secondHalfLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                _Memory.memoryArray[number] = JSON.stringify(parseInt(_Memory.memoryArray[number]) + 1);
                this.PC++;
            }
            else if (currentCommand == "FF") {
                //turns the hex value into a decimal value
                //(do this through an interrupt)
                //also may need to look at Register X
                if (this.Xreg === 1) {
                    _StdOut.putText(JSON.stringify(this.Yreg));
                }
                this.PC++;
            }
            //EA
            // Do the real work here. Be sure to set this.isExecuting appropriately.
            // (_Memory.memoryArray)
            // this.isExecuting = true;
            /*
            var whichArray = Math.floor(this.PC/8);
            var locationinArray = this.PC % 8;
            _StdOut.putText("PC"+JSON.stringify(this.PC));
            var currentCommand = _Memory.memoryArray[whichArray][locationinArray];

            if(currentCommand == "A9") {
                this.PC++;
                whichArray = Math.floor(this.PC/8);
                locationinArray = this.PC % 8;
                currentCommand = _Memory.memoryArray[whichArray][locationinArray];
                this.Acc == currentCommand;
                _CPU.PC++;
                //_StdOut.putText("currentCommand"+JSON.stringify(this.Acc));


            }else if(currentCommand == "8D"){
                this.PC++

                whichArray = Math.floor(this.PC/8);
                locationinArray = this.PC % 8;
                var firstHalfOfCommand =_Memory.memoryArray[whichArray][locationinArray];
                this.PC++;
                whichArray = Math.floor(this.PC/8);
                locationinArray = this.PC % 8;
                var secondHalfOfLocation = _Memory.memoryArray[whichArray][locationinArray];
                var locationForMemory = firstHalfOfCommand + secondHalfOfLocation;
                     whichArray = Math.floor(locationForMemory/8);
                     locationinArray = this.PC % 8;
                _Memory.memoryArray[whichArray][locationinArray] = this.Acc;

                //need to refractor and clean up
                this.PC++;


            }else{
                this.isExecuting = false;

            }
          //  this.isExecuting = false;

            //  this.isExecuting = false;
            /*
            if(_Memory.memoryArray[0][2]== "8D"){
                var position = _Memory.memoryArray[0][3]+_Memory.memoryArray[0][4];
                var positionx = Math.floor(position/8);
                var positiony = position % 8;
                _Memory.memoryArray[positionx][positiony]=this.Acc;

            }
            */
            //this.isExecuting = false;
        };
        return Cpu;
    })();
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
