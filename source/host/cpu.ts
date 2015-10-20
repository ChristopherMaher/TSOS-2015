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

        public cycle(): void {
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            var currentCommand = _Memory.memoryArray[this.PC];

            if(currentCommand === "A9") { //LDA Command

                this.PC++;
                currentCommand = parseInt(_Memory.memoryArray[this.PC],16);
                this.Acc = currentCommand;
                this.PC++;

            }else if(currentCommand === "8D") { //STA command

                this.PC++;

                var address=_MemoryManagement.getAddress(this.PC);

                this.PC++; //account for two spaces
                _MemoryManagement.storeMemory(address,this.Acc);


                this.PC++;

            }else if(currentCommand === "00"){ //BRK command

                Control.loadTable(_Memory.memoryArray);
                _Memory.init();
                this.init();
                this.isExecuting = false;
                //


            }else if(currentCommand === "AD"){ //load accumulator

                this.PC++;

                var address=_MemoryManagement.getAddress(this.PC);

                this.PC++;

               this.Acc= _MemoryManagement.getMemory(address);
/*

*/
                this.PC++;



            }else if(currentCommand === "AC"){ //load Y register from memory
                this.PC++;

                var address=_MemoryManagement.getAddress(this.PC);

                this.PC++;

                this.Yreg = _MemoryManagement.getMemory(address);


                this.PC++;
//                _StdOut.putText(JSON.stringify(this.Yreg));




            }else if(currentCommand === "AE"){ //load x register from memory
               // _StdOut.putText(currentCommand);
                this.PC++;

                var address=_MemoryManagement.getAddress(this.PC);

                this.PC++;

                this.Xreg = _MemoryManagement.getMemory(address);


                this.PC++;


            }else if(currentCommand === "6D"){ //add with Carry
               // _StdOut.putText(currentCommand);
                this.PC++;

                var address=_MemoryManagement.getAddress(this.PC);

                this.PC++;

                this.Acc = _MemoryManagement.getMemory(address) + this.Acc;

                this.PC++;


            }else if(currentCommand === "A2"){ //load Register x with constant

                this.PC++;
                var memory = _MemoryManagement.getMemory(this.PC);

                this.Xreg = memory;

                this.PC++;
            }else if(currentCommand === "A0"){ //load Register y with constant

                this.PC++;

                var memory = _MemoryManagement.getMemory(this.PC);

                this.Yreg = memory;

                this.PC++;
            }else if(currentCommand === "EC"){ //Compare byte in memory to X Register
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

                if(this.Xreg === 1) {
                    _StdOut.advanceLine();
                    _StdOut.putText("SYSTEMCAlL");
                    _StdOut.putText(JSON.stringify(this.Yreg));
                    _StdOut.advanceLine();


                }

                this.PC++;
            }else if(currentCommand === "D0"){ //branching
                this.PC++;
                if(this.Zflag === 0){
                    var branchCheck =this.PC + _MemoryManagement.getMemory(this.PC);

                    if (branchCheck > 255) {
                        this.PC = branchCheck - 256;
                        this.PC++;
                        //_StdOut.putText(JSON.stringify(this.PC));

                    } else {
                        this.PC = branchCheck;
                        this.PC++;
                    }
                }else{
                    this.PC++;
                }



            }


        }
    }
}
