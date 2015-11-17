/**
 * Created by Chris on 11/1/15.
 */
/**
 * Created by Chris on 11/07/15.
 */
///<reference path="../globals.ts" />


module  TSOS {
    export class Scheduler {
        constructor(public quantumNumber: number = 0,
                    public cpuCycle: number = 0) {
            this.quantumNumber = quantumNumber;
            this.cpuCycle = cpuCycle;

        }
        public readySwitch(){
           if(this.cpuCycle === this.quantumNumber){
               this.cpuCycle = 0;
               _CPU.currentPCB(_RuningPIDs[0]);
               if(_PIDArray[_RuningPIDs[0]].state === "Running" || _PIDArray[_RuningPIDs[0]].state === "Ready") {
                   _KernelInterruptQueue.enqueue(new Interrupt(PROGRAMSWITCH, "Running"));
                 //  _StdOut.putText("SADFASDFADSF");
               }else{
                   _KernelInterruptQueue.enqueue(new Interrupt(PROGRAMSWITCH, "Executed"));
               }

           }
        }
        public performSwitch(args){

            if(args === "Running") {
                _PIDArray[_RuningPIDs[0]].state = "Ready";
                var program = _RuningPIDs.shift();
                _RuningPIDs.push(program);
                _PIDArray[_RuningPIDs[0]].state = "Running";

                    _CPU.setPCB(_RuningPIDs[0]);

            }else{
                _RuningPIDs.shift();
                if(_RuningPIDs.length > 0) {
                   // _PIDArray[_RuningPIDs[0]].state = "Running";
                    _CPU.setPCB(_RuningPIDs[0]);
                }

            }

        }



    }

}