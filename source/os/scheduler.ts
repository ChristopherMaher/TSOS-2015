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
                  // _KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ, [6, pid]));
               }else{
                   _KernelInterruptQueue.enqueue(new Interrupt(PROGRAMSWITCH, "Executed"));
               }

           }
        }
        public performSwitch(args){

            if(args === "Running") {
                //_CPU.isExecuting = false;
                _PIDArray[_RuningPIDs[0]].state = "Ready";
                var program = _RuningPIDs.shift();
                _RuningPIDs.push(program);

              //  _PIDArray[_RuningPIDs[0]].state = "Running";
                if(_PIDArray[_RuningPIDs[0]].location === "Storage"){
                    //alert("HIT");
                    _KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ, [6,_RuningPIDs[0]]));
                    alert("Hit");
                  //  setTimeout( () => {
                     //   alert("HIT2");
                    //    _CPU.isExecuting = true;
                    //},1000);



                      //  alert("NMber2");
                    //alert(_PIDArray[_RuningPIDs[0]].pid);
                    //_CPU.isExecuting = false;
                   // setTimeout( () => {
                     //   alert("hit this");
                        //this.test(args);

                        ///  _RuningPIDs.push(args);
                        // _PIDArray[_RuningPIDs[0]].state = "Running";

                        //_StdOut.putText(JSON.stringify(args));
                       // _CPU.setPCB(_RuningPIDs[0]);
                                  }else {
                    _PIDArray[_RuningPIDs[0]].state = "Running";
                    _CPU.setPCB(_RuningPIDs[0]);
                    _CPU.isExecuting = true;
                }

            }else{
                _RuningPIDs.shift();
                if(_RuningPIDs.length > 0) {
                    if(_PIDArray[_RuningPIDs[0]].location === "Storage"){
                        _KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ, [6, _RuningPIDs[0]]));
                        _CPU.isExecuting = false;
                        setTimeout( () => {
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

        }



    }

}