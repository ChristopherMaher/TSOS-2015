/**
 * Created by Chris on 10/17/15.
 */
///<reference path="../globals.ts" />

module  TSOS {
    export class MMU {

        public loadInCommand(userCommand){
            _Memory.createMemoryArray(userCommand);
        }

    }

}
