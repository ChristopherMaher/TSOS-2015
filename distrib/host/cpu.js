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
            if (currentCommand === "A9") {
                //  _StdOut.putText(currentCommand);
                this.PC++;
                currentCommand = parseInt(_Memory.memoryArray[this.PC], 16);
                this.Acc = currentCommand;
                this.PC++;
                //   _StdOut.putText(JSON.stringify(this.Acc));
                //   _StdOut.putText(currentCommand);
                _StdOut.putText("A9".concat(JSON.stringify(this.PC)));
            }
            else if (currentCommand === "8D") {
                // _StdOut.putText(currentCommand);
                this.PC++;
                //captures the first half of the location to store the ACC
                var firstHalfOfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                //captures the second half of the location to store the ACC
                var secondHalfofLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfOfLocation.concat(secondHalfofLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                if (firstHalfOfLocation !== "00") {
                    number = parseInt(firstHalfOfLocation, 16);
                    if (JSON.stringify(this.Acc).length === 1) {
                        _Memory.memoryArray[number] = "0".concat(JSON.stringify(this.Acc));
                    }
                    else {
                        _Memory.memoryArray[number] = JSON.stringify(this.Acc);
                    }
                }
                else {
                    if (JSON.stringify(this.Acc).length === 1) {
                        _Memory.memoryArray[number] = "0".concat(JSON.stringify(this.Acc));
                    }
                    else {
                        _Memory.memoryArray[number] = JSON.stringify(this.Acc);
                    }
                }
                _StdOut.putText("8D".concat(JSON.stringify(this.PC)));
                _StdOut.advanceLine();
                this.PC++;
            }
            else if (currentCommand === "00") {
                _StdOut.advanceLine();
                _StdOut.putText("END");
                _StdOut.putText(JSON.stringify(this.PC));
                _StdOut.putText(_Memory.memoryArray[this.PC - 1]);
                _StdOut.putText(_Memory.memoryArray[this.PC - 2]);
                _StdOut.putText(_Memory.memoryArray[this.PC]);
                _StdOut.advanceLine();
                _StdOut.putText(JSON.stringify(this.Zflag));
                _StdOut.advanceLine();
                _StdOut.putText(JSON.stringify(this.Xreg));
                this.isExecuting = false;
            }
            else if (currentCommand === "AD") {
                //_StdOut.putText(currentCommand);
                this.PC++;
                var firstHalfOfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                var secondHalfofLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfOfLocation.concat(secondHalfofLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                if (firstHalfOfLocation !== "00") {
                    number = parseInt(firstHalfOfLocation, 16);
                    this.Acc = parseInt(_Memory.memoryArray[number]);
                }
                else {
                    this.Acc = parseInt(_Memory.memoryArray[number]);
                }
                _StdOut.putText("AD".concat(JSON.stringify(this.PC)));
                this.PC++;
            }
            else if (currentCommand === "AC") {
                // _StdOut.putText(currentCommand);
                this.PC++;
                var firstHalfOfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                var secondHalfofLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfOfLocation.concat(secondHalfofLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                if (firstHalfOfLocation !== "00") {
                    number = parseInt(firstHalfOfLocation, 16);
                    this.Yreg = parseInt(_Memory.memoryArray[number]);
                }
                else {
                    this.Yreg = parseInt(_Memory.memoryArray[number]);
                }
                _StdOut.putText("AC".concat(JSON.stringify(this.PC)));
                this.PC++;
                _StdOut.putText("RAWR");
                _StdOut.putText(JSON.stringify(this.Yreg));
            }
            else if (currentCommand === "AE") {
                // _StdOut.putText(currentCommand);
                this.PC++;
                var firstHalfOfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                var secondHalfofLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfOfLocation.concat(secondHalfofLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                if (firstHalfOfLocation !== "00") {
                    number = parseInt(firstHalfOfLocation, 16);
                    this.Xreg = parseInt(_Memory.memoryArray[number]);
                }
                else {
                    this.Xreg = parseInt(_Memory.memoryArray[number]);
                }
                _StdOut.putText("AE".concat(JSON.stringify(this.PC)));
                this.PC++;
            }
            else if (currentCommand === "6D") {
                // _StdOut.putText(currentCommand);
                this.PC++;
                var firstHalfOfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                var secondHalfofLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfOfLocation.concat(secondHalfofLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                if (firstHalfOfLocation !== "00") {
                    number = parseInt(firstHalfOfLocation, 16);
                    this.Acc = parseInt(_Memory.memoryArray[number], 16) + this.Acc;
                }
                else {
                    this.Acc = parseInt(_Memory.memoryArray[number], 16) + this.Acc;
                }
                _StdOut.putText("6D".concat(JSON.stringify(this.PC)));
                this.PC++;
            }
            else if (currentCommand === "A2") {
                // _StdOut.putText(currentCommand);
                this.PC++;
                this.Xreg = parseInt(_Memory.memoryArray[this.PC], 16);
                _StdOut.putText("A2".concat(JSON.stringify(this.PC)));
                this.PC++;
            }
            else if (currentCommand === "A0") {
                //_StdOut.putText(currentCommand);
                this.PC++;
                this.Yreg = parseInt(_Memory.memoryArray[this.PC], 16);
                _StdOut.putText("A0".concat(JSON.stringify(this.PC)));
                this.PC++;
            }
            else if (currentCommand === "EC") {
                // _StdOut.putText(currentCommand);
                this.PC++;
                var firstHalfOfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                var secondHalfofLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfOfLocation.concat(secondHalfofLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                if (firstHalfOfLocation !== "00") {
                    number = parseInt(firstHalfOfLocation, 16);
                    //_StdOut.putText(JSON.stringify(number).concat("DSAF"));
                    var value = parseInt(_Memory.memoryArray[number], 16);
                    if (this.Xreg === value) {
                        this.Zflag = 1;
                    }
                    else {
                        this.Zflag = 0;
                    }
                }
                else {
                    var value = parseInt(_Memory.memoryArray[number], 16);
                    if (this.Xreg === value) {
                        this.Zflag = 1;
                    }
                    else {
                        this.Zflag = 0;
                    }
                }
                _StdOut.putText("EC".concat(JSON.stringify(this.PC)));
                this.PC++;
            }
            else if (currentCommand === "EE") {
                this.PC++;
                var firstHalfOfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                var secondHalfofLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfOfLocation.concat(secondHalfofLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                if (firstHalfOfLocation !== "00") {
                    number = parseInt(firstHalfOfLocation, 16);
                    var temp = +_Memory.memoryArray[number];
                    var temp2 = temp + 1;
                    _Memory.memoryArray[number] = "0".concat(JSON.stringify(temp2));
                }
                else {
                    var temp = +_Memory.memoryArray[number];
                    var temp2 = temp + 1;
                    _Memory.memoryArray[number] = "0".concat(JSON.stringify(temp2));
                }
                _StdOut.putText("EE".concat(JSON.stringify(this.PC)));
                this.PC++;
            }
            else if (currentCommand === "FF") {
                //turns the hex value into a decimal value
                //(do this through an interrupt)
                // _StdOut.putText("IAS this called");
                if (this.Xreg === 1) {
                    _StdOut.advanceLine();
                    _StdOut.putText("SYSTEMCAlL");
                    _StdOut.putText(JSON.stringify(this.Yreg));
                    _StdOut.advanceLine();
                }
                //_StdOut.putText("FF".concat(JSON.stringify(this.PC)));
                this.PC++;
            }
            else if (currentCommand === "D0") {
                //also may need to look at Register X
                //    _StdOut.putText(currentCommand);
                this.PC++;
                if (this.Zflag === 0) {
                    var branchCheck = this.PC +
                        parseInt(_Memory.memoryArray[this.PC], 16);
                    if (branchCheck > 255) {
                        this.PC = branchCheck - 256;
                        this.PC++;
                    }
                    else {
                        this.PC = branchCheck;
                        this.PC++;
                    }
                }
                else {
                    this.PC++;
                }
                _StdOut.putText("D0".concat(JSON.stringify(this.PC)));
            }
        };
        return Cpu;
    })();
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
