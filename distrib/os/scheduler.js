/**
 * Created by Chris on 11/1/15.
 */
/**
 * Created by Chris on 11/07/15.
 */
///<reference path="../globals.ts" />
var TSOS;
(function (TSOS) {
    var Scheduler = (function () {
        function Scheduler(quantumNumber, cpuCycle) {
            if (quantumNumber === void 0) { quantumNumber = 0; }
            if (cpuCycle === void 0) { cpuCycle = 0; }
            this.quantumNumber = quantumNumber;
            this.cpuCycle = cpuCycle;
            this.quantumNumber = quantumNumber;
            this.cpuCycle = cpuCycle;
        }
        Scheduler.prototype.readySwitch = function (scheduleType) {
            if (scheduleType === "RR") {
                if (this.cpuCycle === _QuantumNumber) {
                    this.cpuCycle = 0;
                    _CPU.currentPCB(_RuningPIDs[0]);
                    if (_PIDArray[_RuningPIDs[0]].state === "Running" || _PIDArray[_RuningPIDs[0]].state === "Ready") {
                        _KernelInterruptQueue.enqueue(new TSOS.Interrupt(PROGRAMSWITCH, "Running"));
                    }
                    else {
                        _KernelInterruptQueue.enqueue(new TSOS.Interrupt(PROGRAMSWITCH, "Executed"));
                    }
                }
            }
            else if (scheduleType === "FCFS") {
                _CPU.currentPCB(_RuningPIDs[0]);
                if (_PIDArray[_RuningPIDs[0]].state === "Executed") {
                    if (_PIDArray[_RuningPIDs[0]].state === "Running" || _PIDArray[_RuningPIDs[0]].state === "Ready") {
                        _KernelInterruptQueue.enqueue(new TSOS.Interrupt(PROGRAMSWITCH, "Running"));
                    }
                    else {
                        _KernelInterruptQueue.enqueue(new TSOS.Interrupt(PROGRAMSWITCH, "Executed"));
                    }
                }
            }
            else {
                if (_PIDArray[_RuningPIDs[0]].state === "Executed") {
                    if (_PIDArray[_RuningPIDs[0]].state === "Running" || _PIDArray[_RuningPIDs[0]].state === "Ready") {
                        _KernelInterruptQueue.enqueue(new TSOS.Interrupt(PROGRAMSWITCH, "Running"));
                    }
                    else {
                        _KernelInterruptQueue.enqueue(new TSOS.Interrupt(PROGRAMSWITCH, "Executed"));
                    }
                }
            }
        };
        Scheduler.prototype.performSwitch = function (args) {
            if (args === "Running") {
                //_CPU.isExecuting = false;
                _PIDArray[_RuningPIDs[0]].state = "Ready";
                var program = _RuningPIDs.shift();
                _RuningPIDs.push(program);
                //  _PIDArray[_RuningPIDs[0]].state = "Running";
                if (_PIDArray[_RuningPIDs[0]].location === "Storage") {
                    //alert("HIT");
                    _KernelInterruptQueue.enqueue(new TSOS.Interrupt(FILESYSTEM_IRQ, [6, _RuningPIDs[0]]));
                }
                else {
                    _PIDArray[_RuningPIDs[0]].state = "Running";
                    _CPU.setPCB(_RuningPIDs[0]);
                    _CPU.isExecuting = true;
                }
            }
            else {
                _RuningPIDs.shift();
                if (_RuningPIDs.length > 0) {
                    if (_PIDArray[_RuningPIDs[0]].location === "Storage") {
                        _KernelInterruptQueue.enqueue(new TSOS.Interrupt(FILESYSTEM_IRQ, [6, _RuningPIDs[0]]));
                        _CPU.isExecuting = false;
                        setTimeout(function () {
                            //this.test(args);
                            ///  _RuningPIDs.push(args);
                            // _PIDArray[_RuningPIDs[0]].state = "Running";
                            //_StdOut.putText(JSON.stringify(args));
                            _CPU.isExecuting = true;
                        }, 1000);
                    }
                    _CPU.setPCB(_RuningPIDs[0]);
                }
            }
        };
        Scheduler.prototype.setUpPriority = function () {
            var counter = 0;
            var topPriority = 100000;
            var pidTracker = 0;
            var tracker2 = 0;
            var counter2 = 0;
            //_RuningPIDs[];
            while (counter < _RuningPIDs.length) {
                if (topPriority > _PIDArray[_RuningPIDs[counter]].priority) {
                    topPriority = _PIDArray[_RuningPIDs[counter]].priority;
                    pidTracker = _RuningPIDs[counter];
                    tracker2 = counter;
                }
                counter++;
            }
            while (counter2 !== tracker2) {
                var temp = _RuningPIDs.shift();
                _RuningPIDs.push(temp);
                counter2++;
            }
        };
        return Scheduler;
    })();
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
