/* ------------
   Interrupt.ts
   ------------ */

module TSOS {
    export class Interrupt {
        constructor(public irq, public params) {
            this.irq = irq;
            this.params = params;
        }
    }
}
