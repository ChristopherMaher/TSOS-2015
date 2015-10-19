///<reference path="../globals.ts" />

module TSOS {

    export class Memory {

         public memoryArray = new Array(256);
        // public displayArray = new Array[32];
         //public innerDisplayArray = new Array[8];
         //public counter2 = 0;
         public init() {
            /*
             for (var i = 0; i < 32; i++) {
                 this.displayArray[i] = this.innerDisplayArray;
                    for(var x = 0; x < 8; x++){
                        this.innerDisplayArray[x] = "0";
                    }
             }
             */

             for (var i = 0; i < 256; i++) {

                     this.memoryArray[i] = "00";


             }
             //_Memory.makeTableHTML(this.memoryArray);
         }

       /* public  createMemoryArray(userProgram): void{

            var userProgramArray=userProgram.split(" ");
            _StdOut.putText(JSON.stringify(userProgramArray));
            var counter = 0;

            while(counter<userProgramArray.length) {

                    this.memoryArray[counter] = userProgramArray[counter];
                    counter++


            }
           //  this.loadTable();

        }

*/
/*
        public makeTableHTML(memoryarray) {
            //divMemory
            //_StdOut.putText("HELLO");
            //_StdOut.putText("hey");

            var tableDiv = document.getElementById("divMain");
            var table = document.getElementById('divMemory');
            var counter = 0;
            var tr,td,tn;
            var tableBody = document.getElementById('memDisplay');


            var body = document.getElementsByTagName('body')[0];
            var tab = document.getElementById('memDisplayBox');



            for (var row = 0; row < 32; row++){
                tr = document.createElement('tr');
                for (var col = 0; col < 8; col++){
                    td = document.createElement('td');
                    tn = document.createTextNode(memoryarray[counter]);
                    td.appendChild(tn);
                    tr.appendChild(td);
                    counter++;
                }
                tab.appendChild(tr);
            }
            body.appendChild(tab);


        }

        public loadTable() {

            var table = <HTMLTableElement>document.getElementById('memDisplayBox');


            for (var x = 0; x <= 32; x++) {
                table.deleteRow(0);
            }
            var counter = 0;
            var tr,td,tn;
            var tableBody = document.getElementById('memDisplay');


            var body = document.getElementsByTagName('body')[0];


            for (var row = 0; row < 32; row++){
                _StdOut.putText("ASDF");
                tr = document.createElement('tr');
                for (var col = 0; col < 8; col++){
                    td = document.createElement('td');
                    tn = document.createTextNode(this.memoryArray[counter]);
                    td.appendChild(tn);
                    tr.appendChild(td);
                    counter++;
                }
                table.appendChild(tr);
            }
            body.appendChild(table);



        }
        */
     }
}