/**
 * Created by Chris on 10/15/15.
 */
///<reference path="../globals.ts" />
var TSOS;
(function (TSOS) {
    var PCB = (function () {
        function PCB(pid, pc, state, acc, x, y, z, base, limit, location, swapTSB, priority) {
            this.pid = pid;
            this.pc = pc;
            this.state = state;
            this.acc = acc;
            this.x = x;
            this.y = y;
            this.z = z;
            this.base = base;
            this.limit = limit;
            this.location = location;
            this.swapTSB = swapTSB;
            this.priority = priority;
            pid = this.pid;
            pc = this.pc;
            state = this.state;
            acc = this.acc;
            x = this.x;
            y = this.y;
            z = this.z;
            base = this.base;
            limit = this.limit;
            location = this.location;
            swapTSB = this.swapTSB;
            priority = this.priority;
        }
        PCB.prototype.init = function () {
            this.pc = 0;
            this.state = "New";
            this.acc = 0;
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.location = "Memory";
        };
        return PCB;
    })();
    TSOS.PCB = PCB;
})(TSOS || (TSOS = {}));
