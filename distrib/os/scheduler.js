/**
 * Created by Chris on 11/1/15.
 */
/**
 * Created by Chris on 9/19/15.
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
        Scheduler.prototype.performSwitch = function () {
            if (this.cpuCycle === this.quantumNumber + 1) {
                this.cpuCycle = 0;
                _CPU.currentPCB(_RuningPIDs[0]);
                _KernelInterruptQueue.enqueue(new TSOS.Interrupt(PROGRAMSWITCH, 0));
            }
        };
        return Scheduler;
    })();
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
