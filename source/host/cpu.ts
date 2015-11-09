///<reference path="../globals.ts" />

/* ------------
     CPU.ts

     Requires global.ts.

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

module TSOS {

    export class Cpu {

        constructor(public PC: number = 0,
                    public Acc: number = 0,
                    public Xreg: number = 0,
                    public Yreg: number = 0,
                    public Zflag: number = 0,
                    public isExecuting: boolean = false) {

        }

        public init(): void {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        }
       public currentPCB(currentProgram){
           _PIDArray[currentProgram].pc = this.PC;
           _PIDArray[currentProgram].acc = this.Acc;
           _PIDArray[currentProgram].x = this.Xreg;
           _PIDArray[currentProgram].y = this.Yreg;
           _PIDArray[currentProgram].z = this.Zflag;

       }
       public setPCB(newProgram){
           this.PC = _PIDArray[newProgram].pc;
           this.Acc = _PIDArray[newProgram].acc;
           this.Xreg =  _PIDArray[newProgram].x;
           this.Yreg = _PIDArray[newProgram].y;
           this.Zflag =_PIDArray[newProgram].z;

       }


        public cycle(): void {
            _Kernel.krnTrace('CPU cycle');
           // Control.updatePCDDisplay();


            // TODO: Accumulate CPU usage and profiling statistics here.
           /// =_PIDArray[_RuningPIDs[0]].base +this.PC;
         //   var address = _PIDArray[_RuningPIDs[0]].base +this.PC;
           //_StdOut.putText(JSON.stringify(address));
            var currentCommand = _MemoryManagement.getCommamd(this.PC);

            if(currentCommand === "A9") { //LDA Command
                Control.updateCPUDisplay();
                Control.updatePCDDisplay();


                this.PC++;
                var address = this.PC + _PIDArray[_RuningPIDs[0]].base;
                currentCommand = _MemoryManagement.getMemory(address);
                this.Acc = currentCommand;
               // _StdOut.putText(JSON.stringify(currentCommand));
                this.PC++;

            }else if(currentCommand === "8D") { //STA command
                Control.updateCPUDisplay();
                Control.updatePCDDisplay();


                this.PC++;

                var address=_MemoryManagement.getAddress(this.PC);

                this.PC++; //account for two spaces
                _MemoryManagement.storeMemory(address,this.Acc);


                this.PC++;

            }else if(currentCommand === "00"){ //BRK command
                //_StdOut.putText(JSON.stringify(_PIDArray[_RuningPIDs[0]].limit));
                //_StdOut.putText(JSON.stringify(_PIDArray[_RuningPIDs[0]].base));

                _MemoryManagement.resetMemory(_PIDArray[_RuningPIDs[0]].base,_PIDArray[_RuningPIDs[0]].limit);
                _MemoryManagement.resetBaseAvailablity(_PIDArray[_RuningPIDs[0]].base);
                this.PC = 0;
                this.Acc = 0;
                this.Xreg = 0;
                this.Yreg = 0;
                this.Zflag = 0;
                _Scheduler.cpuCycle = _Scheduler.quantumNumber -1;
                _PIDArray[_RuningPIDs[0]].state = "Executed";

                Control.loadTable();

                if(_RuningPIDs.length === 1) {
                    this.isExecuting = false;
                   // _Scheduler.cpuCycle = _Scheduler.quantumNumber -1;

                }


                Control.loadTable();


            }else if(currentCommand === "AD"){ //load accumulator
                Control.updateCPUDisplay();
                Control.updatePCDDisplay();



                this.PC++;

                var address=_MemoryManagement.getAddress(this.PC);

                this.PC++;

               this.Acc= _MemoryManagement.getMemory(address);
/*

*/
                this.PC++;



            }else if(currentCommand === "AC"){ //load Y register from memory
                Control.updateCPUDisplay();
                Control.updatePCDDisplay();


                this.PC++;

                var address=_MemoryManagement.getAddress(this.PC);

                this.PC++;

                this.Yreg = _MemoryManagement.getMemory(address);


                this.PC++;
//                _StdOut.putText(JSON.stringify(this.Yreg));




            }else if(currentCommand === "AE"){ //load x register from memory
                Control.updateCPUDisplay();
                Control.updatePCDDisplay();


                // _StdOut.putText(currentCommand);
                this.PC++;

                var address=_MemoryManagement.getAddress(this.PC);

                this.PC++;

                this.Xreg = _MemoryManagement.getMemory(address);


                this.PC++;
           //     _StdOut.putText(JSON.stringify(this.Xreg));
               // _StdOut.putText("PC:");
             //   _StdOut.putText(JSON.stringify(this.PC));
                //_StdOut.advanceLine();


            }else if(currentCommand === "6D"){ //add with Carry
                Control.updateCPUDisplay();
                Control.updatePCDDisplay();


                // _StdOut.putText(currentCommand);
                this.PC++;

                var address=_MemoryManagement.getAddress(this.PC);

                this.PC++;

                this.Acc = _MemoryManagement.getMemory(address) + this.Acc;

                this.PC++;


            }else if(currentCommand === "A2"){ //load Register x with constant
                Control.updateCPUDisplay();
                Control.updatePCDDisplay();



                this.PC++;
                var address = _PIDArray[_RuningPIDs[0]].base +this.PC;

                var memory = _MemoryManagement.getMemory(address);

                this.Xreg = memory;

                this.PC++;
            }else if(currentCommand === "A0"){ //load Register y with constant
                Control.updateCPUDisplay();
                Control.updatePCDDisplay();



                this.PC++;

                var address = this.PC+_PIDArray[_RuningPIDs[0]].base;
                var memory = _MemoryManagement.getMemory(address);

                this.Yreg = memory;

                this.PC++;
            }else if(currentCommand === "EC"){ //Compare byte in memory to X Register
                Control.updateCPUDisplay();
                Control.updatePCDDisplay();


                // _StdOut.putText(currentCommand);
                this.PC++;

                var address=_MemoryManagement.getAddress(this.PC);

                this.PC++;
                var value = _MemoryManagement.getMemory(address);
                if (this.Xreg === value) {
                    this.Zflag = 1;
                }else{
                    this.Zflag =0;
                }

                this.PC++;

            }else if(currentCommand === "EE"){ //increment by 1
                Control.updateCPUDisplay();
                Control.updatePCDDisplay();


                this.PC++;

                var address=_MemoryManagement.getAddress(this.PC);

                this.PC++;
                var temp = _MemoryManagement.getMemory(address);
                var temp2 = temp + 1;

                _MemoryManagement.storeMemory(address,temp2);

                this.PC++;

            }else if(currentCommand === "FF"){ //SystemCall
                //turns the hex value into a decimal value
                //(do this through an interrupt)
               // _StdOut.putText("IAS this called");
//                _StdOut.putText("HITSTHIS");

                if(this.Xreg === 1) {
                   // _StdOut.putText("HITSTHIS2");
                    // _StdOut.advanceLine();
                   // _StdOut.putText("SYSTEMCAlL");
                  //  _KernelInputQueue.enqueue(chr)
                    _KernelInterruptQueue.enqueue(new Interrupt(SYSTEMCALL_IRQ,JSON.stringify(this.Yreg)));
                   // _StdOut.putText(JSON.stringify(this.Yreg));
                    //_StdOut.advanceLine();


                }

                if(this.Xreg === 2){
                    var stringToBeConverted ="";
                   // var tempString = "";
                    stringToBeConverted = this.systemCall(this.Yreg);
                    //this.Yreg
                    _KernelInterruptQueue.enqueue(new Interrupt(SYSTEMCALL_IRQ,stringToBeConverted));
                   // _StdOut.putText(tempString);

                }

                this.PC++;
            }else if(currentCommand === "D0"){ //branching
                Control.updateCPUDisplay();
                Control.updatePCDDisplay();


                this.PC++;
                if(this.Zflag === 0){
                    //var address = this.PC+_PIDArray[_RuningPIDs[0]].base;
                 //   var memory = _MemoryManagement.getMemory(address);
                    var address = _PIDArray[_RuningPIDs[0]].base +this.PC;
                    var branchCheck =this.PC + _MemoryManagement.getMemory(address);

                    if (branchCheck > 255) {
                   //     _StdOut.putText(_MemoryManagement.getCommamd(this.PC));
                     //   _StdOut.putText("HEY");


                        this.PC = branchCheck - 256;
                        this.PC++;
                        //_StdOut.putText(JSON.stringify(this.PC));

                    } else {
//                        _StdOut.putText(_MemoryManagement.getCommamd(this.PC));

                        this.PC = branchCheck;
                        this.PC++;

                    }
                }else{
                    this.PC++;
                }



            }


        }
        public systemCall(address){
            var stringBeingConverted = "";
            var tempProgramCounter = address;
           // _MemoryManagement.getCommamd(address);
            while(_MemoryManagement.getCommamd(tempProgramCounter) !== "00") {
                var temp = _MemoryManagement.getMemory(tempProgramCounter);
                stringBeingConverted += String.fromCharCode(temp);
                tempProgramCounter++;

            }
            return stringBeingConverted;

        }
    }
}
