///<reference path="../globals.ts" />

module TSOS {

    export class Memory {

         public memoryArray = new Array(255);
         public init() {
             for (var i = 0; i < 255; i++) {

                     this.memoryArray[i] = "00";

             }
         }

        public  createMemoryArray(userProgram): void{

            var userProgramArray=userProgram.split(" ");
            var counter = 0;

            while(counter<userProgramArray.length) {

                    this.memoryArray[counter] = userProgramArray[counter];
                    counter++


            }
              //  this.memoryArray[i] = "00";

                /*
                this.memoryArray[i] = new Array(8);
                for (var x = 0; x < 8; x++) {

                    if(counter<userProgramArray.length) {
                        this.memoryArray[i][x] = userProgramArray[counter];
                        counter++

                    }else{
                        this.memoryArray[i][x] =0;
                    }

                }
                 */
           // }

        }



    }
}