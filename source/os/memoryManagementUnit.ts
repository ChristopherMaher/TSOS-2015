/**
 * Created by Chris on 10/17/15.
 */
///<reference path="../globals.ts" />

module  TSOS {
    export class MemoryManagementUnit {

        public loadInCommand(userCommand){

                var userProgramArray=userCommand.split(" ");
                _StdOut.putText(JSON.stringify(userProgramArray));
                var counter = 0;

                while(counter<userProgramArray.length) {

                _Memory.memoryArray[counter] = userProgramArray[counter];
                counter++


            }

        }

        public  getMemory(programCounter){

        return parseInt(_Memory.memoryArray[programCounter],16);

        }

        public storeMemory(address,value){
            value = JSON.stringify(value);
            if(value.length === 1) {
                _Memory.memoryArray[address] = "0".concat(value);
            }else{
                 _Memory.memoryArray[address] = value;
            }

        }

        public getAddress(programCounter){
            var firstHalfOfLocation = _Memory.memoryArray[programCounter];
            //captures the second half of the location to store the ACC
            var secondHalfofLocation = _Memory.memoryArray[programCounter++];
            //var number = parseInt(fulllocation, 16);
            var fulllocation = firstHalfOfLocation.concat(secondHalfofLocation);

            if(firstHalfOfLocation !== "00") {
                return parseInt(firstHalfOfLocation,16);
            }else{
                return parseInt(fulllocation,16);

            }


        }




    }

}
