/**
 * Created by Chris on 11/1/15.
 */
/**
 * Created by Chris on 9/19/15.
 */
///<reference path="../globals.ts" />


module  TSOS {
    export class Scheduler {
        constructor(public quantumNumber: number = 0,
                    public cpuCycle: number = 0) {
            this.quantumNumber = quantumNumber;
            this.cpuCycle = cpuCycle;

        }
        public performSwitch(){
           if(this.cpuCycle === this.quantumNumber){
               this.cpuCycle = 0;
               _CPU.currentPCB(_RuningPIDs[0]);
               _KernelInterruptQueue.enqueue(new Interrupt(PROGRAMSWITCH,0));

           }
        }



    }

}