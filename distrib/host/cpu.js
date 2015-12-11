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
        Cpu.prototype.currentPCB = function (currentProgram) {
            _PIDArray[currentProgram].pc = this.PC;
            _PIDArray[currentProgram].acc = this.Acc;
            _PIDArray[currentProgram].x = this.Xreg;
            _PIDArray[currentProgram].y = this.Yreg;
            _PIDArray[currentProgram].z = this.Zflag;
        };
        Cpu.prototype.setPCB = function (newProgram) {
            this.PC = _PIDArray[newProgram].pc;
            this.Acc = _PIDArray[newProgram].acc;
            this.Xreg = _PIDArray[newProgram].x;
            this.Yreg = _PIDArray[newProgram].y;
            this.Zflag = _PIDArray[newProgram].z;
        };
        Cpu.prototype.cycle = function () {
            _Kernel.krnTrace('CPU cycle');
            // Control.updatePCDDisplay();
            // TODO: Accumulate CPU usage and profiling statistics here.
            /// =_PIDArray[_RuningPIDs[0]].base +this.PC;
            //   var address = _PIDArray[_RuningPIDs[0]].base +this.PC;
            //_StdOut.putText(JSON.stringify(address));
            var currentCommand = _MemoryManagement.getCommamd(this.PC);
            if (currentCommand === "A9") {
                TSOS.Control.updateCPUDisplay();
                TSOS.Control.updatePCDDisplay();
                this.PC++;
                var address = this.PC + _PIDArray[_RuningPIDs[0]].base;
                currentCommand = _MemoryManagement.getMemory(address);
                this.Acc = currentCommand;
                // _StdOut.putText(JSON.stringify(currentCommand));
                this.PC++;
            }
            else if (currentCommand === "8D") {
                TSOS.Control.updateCPUDisplay();
                TSOS.Control.updatePCDDisplay();
                this.PC++;
                var address = _MemoryManagement.getAddress(this.PC);
                this.PC++; //account for two spaces
                _MemoryManagement.storeMemory(address, this.Acc);
                this.PC++;
            }
            else if (currentCommand === "00") {
                //_StdOut.putText(JSON.stringify(_PIDArray[_RuningPIDs[0]].limit));
                //_StdOut.putText(JSON.stringify(_PIDArray[_RuningPIDs[0]].base));
                //var temp = this.PC + _PIDArray[_RuningPIDs[0]].base;
                //_StdOut.putText(JSON.stringify(temp));
                //  _StdOut.putText("HELLO");
                _MemoryManagement.resetMemory(_PIDArray[_RuningPIDs[0]].base, _PIDArray[_RuningPIDs[0]].limit);
                _MemoryManagement.resetBaseAvailablity(_PIDArray[_RuningPIDs[0]].base);
                this.PC = 0;
                this.Acc = 0;
                this.Xreg = 0;
                this.Yreg = 0;
                this.Zflag = 0;
                _Scheduler.cpuCycle = _Scheduler.quantumNumber - 1;
                _PIDArray[_RuningPIDs[0]].state = "Executed";
                TSOS.Control.loadTable();
                if (_RuningPIDs.length === 1) {
                    this.isExecuting = false;
                }
                TSOS.Control.loadTable();
            }
            else if (currentCommand === "AD") {
                TSOS.Control.updateCPUDisplay();
                TSOS.Control.updatePCDDisplay();
                this.PC++;
                var address = _MemoryManagement.getAddress(this.PC);
                this.PC++;
                this.Acc = _MemoryManagement.getMemory(address);
                /*
                
                */
                this.PC++;
            }
            else if (currentCommand === "AC") {
                TSOS.Control.updateCPUDisplay();
                TSOS.Control.updatePCDDisplay();
                this.PC++;
                var address = _MemoryManagement.getAddress(this.PC);
                this.PC++;
                this.Yreg = _MemoryManagement.getMemory(address);
                this.PC++;
            }
            else if (currentCommand === "AE") {
                TSOS.Control.updateCPUDisplay();
                TSOS.Control.updatePCDDisplay();
                // _StdOut.putText(currentCommand);
                this.PC++;
                var address = _MemoryManagement.getAddress(this.PC);
                this.PC++;
                this.Xreg = _MemoryManagement.getMemory(address);
                this.PC++;
            }
            else if (currentCommand === "6D") {
                TSOS.Control.updateCPUDisplay();
                TSOS.Control.updatePCDDisplay();
                // _StdOut.putText(currentCommand);
                this.PC++;
                var address = _MemoryManagement.getAddress(this.PC);
                this.PC++;
                this.Acc = _MemoryManagement.getMemory(address) + this.Acc;
                this.PC++;
            }
            else if (currentCommand === "A2") {
                TSOS.Control.updateCPUDisplay();
                TSOS.Control.updatePCDDisplay();
                this.PC++;
                var address = _PIDArray[_RuningPIDs[0]].base + this.PC;
                var memory = _MemoryManagement.getMemory(address);
                this.Xreg = memory;
                this.PC++;
            }
            else if (currentCommand === "A0") {
                TSOS.Control.updateCPUDisplay();
                TSOS.Control.updatePCDDisplay();
                this.PC++;
                var address = this.PC + _PIDArray[_RuningPIDs[0]].base;
                var memory = _MemoryManagement.getMemory(address);
                this.Yreg = memory;
                this.PC++;
            }
            else if (currentCommand === "EC") {
                TSOS.Control.updateCPUDisplay();
                TSOS.Control.updatePCDDisplay();
                // _StdOut.putText(currentCommand);
                this.PC++;
                var address = _MemoryManagement.getAddress(this.PC);
                this.PC++;
                var value = _MemoryManagement.getMemory(address);
                if (this.Xreg === value) {
                    this.Zflag = 1;
                }
                else {
                    this.Zflag = 0;
                }
                this.PC++;
            }
            else if (currentCommand === "EE") {
                TSOS.Control.updateCPUDisplay();
                TSOS.Control.updatePCDDisplay();
                this.PC++;
                var address = _MemoryManagement.getAddress(this.PC);
                this.PC++;
                var temp = _MemoryManagement.getMemory(address);
                var temp2 = temp + 1;
                _MemoryManagement.storeMemory(address, temp2);
                this.PC++;
            }
            else if (currentCommand === "FF") {
                //turns the hex value into a decimal value
                //(do this through an interrupt)
                // _StdOut.putText("IAS this called");
                //                _StdOut.putText("HITSTHIS");
                if (this.Xreg === 1) {
                    // _StdOut.putText("HITSTHIS2");
                    // _StdOut.advanceLine();
                    // _StdOut.putText("SYSTEMCAlL");
                    //  _KernelInputQueue.enqueue(chr)
                    _KernelInterruptQueue.enqueue(new TSOS.Interrupt(SYSTEMCALL_IRQ, JSON.stringify(this.Yreg)));
                }
                if (this.Xreg === 2) {
                    var stringToBeConverted = "";
                    // var tempString = "";
                    stringToBeConverted = this.systemCall(this.Yreg);
                    //this.Yreg
                    //  _StdOut.putText(stringToBeConverted);
                    _KernelInterruptQueue.enqueue(new TSOS.Interrupt(SYSTEMCALL_IRQ, stringToBeConverted));
                }
                this.PC++;
            }
            else if (currentCommand === "D0") {
                TSOS.Control.updateCPUDisplay();
                TSOS.Control.updatePCDDisplay();
                this.PC++;
                if (this.Zflag === 0) {
                    var address = _PIDArray[_RuningPIDs[0]].base + this.PC;
                    var branchCheck = this.PC + _MemoryManagement.getMemory(address);
                    if (branchCheck > 255) {
                        //     _StdOut.putText(_MemoryManagement.getCommamd(this.PC));
                        //   _StdOut.putText("HEY");
                        this.PC = branchCheck - 256;
                        this.PC++;
                    }
                    else {
                        //                        _StdOut.putText(_MemoryManagement.getCommamd(this.PC));
                        this.PC = branchCheck;
                        this.PC++;
                    }
                }
                else {
                    this.PC++;
                }
            }
        };
        Cpu.prototype.systemCall = function (address) {
            var stringBeingConverted = "";
            if ((address + _PIDArray[_RuningPIDs[0]].base) < (_PIDArray[_RuningPIDs[0]].base + 256)) {
                var tempProgramCounter = address + _PIDArray[_RuningPIDs[0]].base;
            }
            else {
                var tempProgramCounter = address;
            }
            while (_MemoryManagement.systemgetCommand(tempProgramCounter) !== "00") {
                var temp = _MemoryManagement.getMemory(tempProgramCounter);
                stringBeingConverted += String.fromCharCode(temp);
                tempProgramCounter++;
            }
            return stringBeingConverted;
        };
        return Cpu;
    })();
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
