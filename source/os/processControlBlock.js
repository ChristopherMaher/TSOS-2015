/**
 * Created by Chris on 10/15/15.
 */
var TSOS;
(function (TSOS) {
    var ProcessControlBlock = (function () {
        function ProcessControlBlock() {
        }
        return ProcessControlBlock;
    })();
    TSOS.ProcessControlBlock = ProcessControlBlock;
    var PCB = (function () {
        function PCB(pid, pc, state, acc, x, y, z, base, limit, location) {
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
})(TSOS || (TSOS = {}));
//# sourceMappingURL=processControlBlock.js.map