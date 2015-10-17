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
            if(currentCommand == "A9") { //LDA Command
                this.PC++;
                currentCommand = _Memory.memoryArray[this.PC];
                this.Acc = currentCommand;
                this.PC++;


            }else if(currentCommand == "8D") { //STA command
                this.PC++;
                //captures the first half of the location to store the ACC
                var firstHalfLocation = _Memory.memoryArray[this.PC];
                this.PC++;
                //captures the second half of the location to store the ACC
                var secondHalfLocation = _Memory.memoryArray[this.PC];
                var fulllocation = firstHalfLocation.concat(secondHalfLocation);
                //turns the hex value into a decimal value
                var number = parseInt(fulllocation, 16);
                _Memory.memoryArray[number] = this.Acc;


                this.PC++;

            }else if(currentCommand == "00"){ //BRK command
                this.isExecuting = false;

            }


            // Do the real work here. Be sure to set this.isExecuting appropriately.
           // (_Memory.memoryArray)
           // this.isExecuting = true;
            /*
            var whichArray = Math.floor(this.PC/8);
            var locationinArray = this.PC % 8;
            _StdOut.putText("PC"+JSON.stringify(this.PC));
            var currentCommand = _Memory.memoryArray[whichArray][locationinArray];

            if(currentCommand == "A9") {
                this.PC++;
                whichArray = Math.floor(this.PC/8);
                locationinArray = this.PC % 8;
                currentCommand = _Memory.memoryArray[whichArray][locationinArray];
                this.Acc == currentCommand;
                _CPU.PC++;
                //_StdOut.putText("currentCommand"+JSON.stringify(this.Acc));


            }else if(currentCommand == "8D"){
                this.PC++

                whichArray = Math.floor(this.PC/8);
                locationinArray = this.PC % 8;
                var firstHalfOfCommand =_Memory.memoryArray[whichArray][locationinArray];
                this.PC++;
                whichArray = Math.floor(this.PC/8);
                locationinArray = this.PC % 8;
                var secondHalfOfLocation = _Memory.memoryArray[whichArray][locationinArray];
                var locationForMemory = firstHalfOfCommand + secondHalfOfLocation;
                     whichArray = Math.floor(locationForMemory/8);
                     locationinArray = this.PC % 8;
                _Memory.memoryArray[whichArray][locationinArray] = this.Acc;

                //need to refractor and clean up
                this.PC++;


            }else{
                this.isExecuting = false;

            }
          //  this.isExecuting = false;

            //  this.isExecuting = false;
            /*
            if(_Memory.memoryArray[0][2]== "8D"){
                var position = _Memory.memoryArray[0][3]+_Memory.memoryArray[0][4];
                var positionx = Math.floor(position/8);
                var positiony = position % 8;
                _Memory.memoryArray[positionx][positiony]=this.Acc;

            }
            */
            //this.isExecuting = false;

        }
    }
}
