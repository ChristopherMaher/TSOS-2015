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
           // var thing = _Memory.makeTableHTML(this.memoryArray);
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
          //  this.amendTableHTML(this.memoryArray);

        }

        public makeTableHTML(memoryarray) {
            //divMemory
            var tableDiv = document.getElementById("divMain");
            var table = document.getElementById('divMemory');
            //table.border = '1';
            var counter = 0;
            var tr,td,tn;
            var tableBody = document.getElementById('memDisplay');
            //table.appendChild(tableBody);
            var body = document.getElementsByTagName('body')[0];
            var tab = document.createElement('table');
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

        public amendTableHTML(memoryarray) {
            var tableDiv = document.getElementById("divMain");
            var table = document.getElementById('divMemory');
            //table.border = '1';
            var counter = 0;
            var tr,td,tn;
            var body = document.getElementById('memDisplay');
            //table.appendChild(tableBody);
           // var body = document.getElementsByTagName('body')[0];

            var tab = <HTMLTableElement>document.getElementById('memDisplayBox');

            for (var row = 0; row < 32; row++){
                tab.deleteRow();
            }
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

             /*
        public makeTableHTML(memoryarray) {
            //divMemory
            var tableDiv = document.getElementById("divMain");
            var table = document.getElementById('divMemory');
            //table.border = '1';


            var tableBody = document.getElementById('memDisplay');
            table.appendChild(tableBody);
            var counter = 0;
            for (var i = 0; i < 32; i++) {
                var tr = document.createElement('TR');
                tableBody.appendChild(tr);

                for (var j = 0; j < 8; j++) {
                    var td = document.createElement('TD');
                    //td.width = '75';
                    td.appendChild(document.createTextNode(this.memoryArray[counter]));
                    tr.appendChild(td);
                    counter++;
                }
            }
            //instead of create maybe getelementbyID
            tableDiv.appendChild(table);


            /*
             var result = "<table border=1>";
             for(var i=0; i<displayArray.length; i++) {
             result += "<tr>";
             for(var j=0; j<displayArray[i].length; j++){
             result += "<td>"+displayArray[i][j]+"</td>";
             }
             result += "</tr>";
             }
             result += "</table>";

             return result;
             }
             */

/*
        }
    */
        /*
        public amendTableHTML(memoryarray) {
            //divMemory
            var tableDiv = document.getElementById("divMain");
            var table = document.getElementById('divMemory');
            //table.border = '1';


            var tableBody = document.getElementById('memDisplayBox');

            //table.appendChild(tableBody);
            var counter = 0;
            for (var i = 0; i < 32; i++) {
              //  var tr = document.getElementById('TR');
                //tableBody.appendChild(tr);

                for (var j = 0; j < 8; j++) {

                //    var td = document.getElementById('TD');
                  //  tableBody.rows[i].cells[j].innerHTML = this.memoryArray[counter];
                    //td.width = '75';
                    //td.appendChild(document.createTextNode(this.memoryArray[counter]));
                    //tr.appendChild(td);
                    counter++;
                }
            }
            //instead of create maybe getelementbyID
          //  tableDiv.appendChild(table);
        }

        */


        }
}