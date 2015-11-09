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
        Scheduler.prototype.readySwitch = function () {
            if (this.cpuCycle === this.quantumNumber) {
                this.cpuCycle = 0;
                _CPU.currentPCB(_RuningPIDs[0]);
                if (_PIDArray[_RuningPIDs[0]].state === "Running") {
                    _KernelInterruptQueue.enqueue(new TSOS.Interrupt(PROGRAMSWITCH, "Running"));
                }
                else {
                    _KernelInterruptQueue.enqueue(new TSOS.Interrupt(PROGRAMSWITCH, "Executed"));
                }
            }
        };
        Scheduler.prototype.performSwitch = function (args) {
            if (args === "Running") {
                var program = _RuningPIDs.shift();
                _RuningPIDs.push(program);
                _CPU.setPCB(_RuningPIDs[0]);
            }
            else {
                _RuningPIDs.shift();
                if (_RuningPIDs.length > 0)
                    _CPU.setPCB(_RuningPIDs[0]);
            }
        };
        return Scheduler;
    })();
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
