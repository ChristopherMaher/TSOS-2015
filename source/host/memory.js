var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory(userProgram) {
            // public memoryArray:;
            this.memoryArray = [[]];
        }
        Memory.prototype.createMemoryArray = function (userProgram) {
            userProgram.split(" ");
        };
        return Memory;
    })();
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memory.js.map