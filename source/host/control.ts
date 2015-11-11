///<reference path="../globals.ts" />
///<reference path="../os/canvastext.ts" />

/* ------------
     Control.ts

     Requires globals.ts.

     Routines for the hardware simulation, NOT for our client OS itself.
     These are static because we are never going to instantiate them, because they represent the hardware.
     In this manner, it's A LITTLE BIT like a hypervisor, in that the Document environment inside a browser
     is the "bare metal" (so to speak) for which we write code that hosts our client OS.
     But that analogy only goes so far, and the lines are blurred, because we are using TypeScript/JavaScript
     in both the host and client environments.

     This (and other host/simulation scripts) is the only place that we should see "web" code, such as
     DOM manipulation and event handling, and so on.  (Index.html is -- obviously -- the only place for markup.)

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

//
// Control Services
//
module TSOS {

    export class Control {

        public static hostInit(): void {
            // This is called from index.html's onLoad event via the onDocumentLoad function pointer.

            // Get a global reference to the canvas.  TODO: Should we move this stuff into a Display Device Driver?
            _Canvas = <HTMLCanvasElement>document.getElementById('display');

            // Get a global reference to the drawing context.
            _DrawingContext = _Canvas.getContext("2d");

            // Enable the added-in canvas text functions (see canvastext.ts for provenance and details).
            CanvasTextFunctions.enable(_DrawingContext);   // Text functionality is now built in to the HTML5 canvas. But this is old-school, and fun, so we'll keep it.

            // Clear the log text box.
            // Use the TypeScript cast to HTMLInputElement
            (<HTMLInputElement> document.getElementById("taHostLog")).value="";

            // Set focus on the start button.
            // Use the TypeScript cast to HTMLInputElement
            (<HTMLInputElement> document.getElementById("btnStartOS")).focus();

            // Check for our testing and enrichment core, which
            // may be referenced here (from index.html) as function Glados().
            if (typeof Glados === "function") {
                // function Glados() is here, so instantiate Her into
                // the global (and properly capitalized) _GLaDOS variable.
                _GLaDOS = new Glados();
                _GLaDOS.init();
            }
        }

        public static hostLog(msg: string, source: string = "?"): void {
            // Note the OS CLOCK.
            var clock: number = _OSclock;

            // Note the REAL clock in milliseconds since January 1, 1970.
            var now: number = new Date().getTime();

            // Build the log string.
            var str: string = "({ clock:" + clock + ", source:" + source + ", msg:" + msg + ", now:" + now  + " })"  + "\n";

            // Update the log console.
            var taLog = <HTMLInputElement> document.getElementById("taHostLog");
            taLog.value = str + taLog.value;


            // TODO in the future: Optionally update a log database or some streaming service.
        }


        //
        // Host Events
        //
        public static hostBtnStartOS_click(btn): void {
            // Disable the (passed-in) start button...
            btn.disabled = true;

            // .. enable the Halt and Reset buttons ...
            (<HTMLButtonElement>document.getElementById("btnHaltOS")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnReset")).disabled = false;

            // .. set focus on the OS console display ...
            document.getElementById("display").focus();


            //create Memory
            _Scheduler = new Scheduler(_QuantumNumber,0);
            _Memory = new Memory();
            _Memory.init();
            _MemoryManagement = new MemoryManagementUnit();


            _MemoryTable =<HTMLTableElement> document.getElementById("memDisplayBox");
            //create table display
            _CPUDisplayTable =<HTMLTableElement> document.getElementById("CPUDisplayTable");


            this.createMemoryTable();


            // ... Create and initialize the CPU (because it's part of the hardware)  ...
            _CPU = new Cpu();  // Note: We could simulate multi-core systems by instantiating more than one instance of the CPU here.
            _CPU.init();       //       There's more to do, like dealing with scheduling and such, but this would be a start. Pretty cool.

            //create MemoryManagementUnit

            // ... then set the host clock pulse ...
            _hardwareClockID = setInterval(Devices.hostClockPulse, CPU_CLOCK_INTERVAL);
            // .. and call the OS Kernel Bootstrap routine.
            _Kernel = new Kernel();
            _Kernel.krnBootstrap();  // _GLaDOS.afterStartup() will get called in there, if configured.
        }

        public static hostBtnHaltOS_click(btn): void {
            Control.hostLog("Emergency halt", "host");
            Control.hostLog("Attempting Kernel shutdown.", "host");
            // Call the OS shutdown routine.
            _Kernel.krnShutdown();
            // Stop the interval that's simulating our clock pulse.
            clearInterval(_hardwareClockID);
            // TODO: Is there anything else we need to do here?
        }

        public static hostBtnReset_click(btn): void {
            // The easiest and most thorough way to do this is to reload (not refresh) the document.
            location.reload(true);
            // That boolean parameter is the 'forceget' flag. When it is true it causes the page to always
            // be reloaded from the server. If it is false or not specified the browser may reload the
            // page from its cache, which is not what we want.
        }

        public static createMemoryTable() {
            var tableOutput = "<tr>";
            var counter =0;
            var rowID = "";
            for(var z =0; z <96; z++){
                rowID = "rowID"+z;
                if(z !== 0) {
                    tableOutput += "</tr>";
                }
                tableOutput += "<tr id="+ rowID + ">";

                for(var i = 0; i<8; i++){
                    tableOutput += "<td id=dataID" + counter +">"+"00" + "</td>";
                    // if(i % 8 === 0){
                    counter++;

                }
                tableOutput += "</tr>";
                _MemoryTable.innerHTML = tableOutput;

            }

        }
            /*

            var counter = 0;
            var tr,td,tn;

            var body = document.getElementsByTagName('body')[0];


            for (var row = 0; row < 32; row++){
                tr = document.createElement('tr');
                for (var col = 0; col < 8; col++){
                    td = document.createElement('td');
                    tn = document.createTextNode(_Memory.memoryArray[counter]);
                    td.appendChild(tn);
                    tr.appendChild(td);
                    counter++;
                }
                _MemoryTable.appendChild(tr);
            }
            body.appendChild(_MemoryTable);

*/





        /*
        public static loadTable(memoryArray) {



            for (var x = 0; x <= 32; x++) {
                _MemoryTable.deleteRow(0);
            }
            var counter = 0;
            var tr,td,tn;

            var body = document.getElementsByTagName('body')[0];


            for (var row = 0; row < 32; row++){
                tr = document.createElement('tr');
                for (var col = 0; col < 8; col++){
                    td = document.createElement('td');
                    tn = document.createTextNode(memoryArray[counter]);
                    td.appendChild(tn);
                    tr.appendChild(td);
                    counter++;
                }
                _MemoryTable.appendChild(tr);
            }
            body.appendChild(_MemoryTable);



        }
        */
        public static loadTable() {
            var tableOutput = "<tr>";
            var counter =0;
            var rowID = "";
            for (var x = 0; x <= 96; x++) {
                _MemoryTable.deleteRow(0);
            }
            for(var z =0; z <96; z++){
                rowID = "rowID"+z;
                if(z !== 0) {
                    tableOutput += "</tr>";
                }
                tableOutput += "<tr id="+ rowID + ">";

                for(var i = 0; i<8; i++){
                    tableOutput += "<td id=dataID" + counter +">"+_MemoryManagement.getCommamd(counter) + "</td>";
                    counter++;

                }
                tableOutput += "</tr>";
                _MemoryTable.innerHTML = tableOutput;

            }

        }
        public static updateCPUDisplay(){
            document.getElementById("PCDisplay").innerHTML = JSON.stringify(_CPU.PC);
            document.getElementById("ACCDisplay").innerHTML = JSON.stringify(_CPU.Acc);
            document.getElementById("XDisplay").innerHTML = JSON.stringify(_CPU.Xreg);
            document.getElementById("YDisplay").innerHTML = JSON.stringify(_CPU.Yreg);
            document.getElementById("ZDisplay").innerHTML = JSON.stringify(_CPU.Zflag);

        }
        public static updatePCDDisplay(){
            document.getElementById("PIDPCBDisplay").innerHTML = JSON.stringify(_PCB.pid);
            document.getElementById("PCPCBDisplay").innerHTML = JSON.stringify(_CPU.PC);
            document.getElementById("ACCPCBDisplay").innerHTML = JSON.stringify(_CPU.Acc);
            document.getElementById("XPCBDisplay").innerHTML = JSON.stringify(_CPU.Xreg);
            document.getElementById("YPCBDisplay").innerHTML = JSON.stringify(_CPU.Yreg);
            document.getElementById("ZPCBDisplay").innerHTML = JSON.stringify(_CPU.Zflag);
            document.getElementById("Location").innerHTML = _PCB.location;
            document.getElementById("Base").innerHTML = JSON.stringify(0);
            document.getElementById("Limit").innerHTML = JSON.stringify(255);
            document.getElementById("Running").innerHTML = _PCB.state;

        }


    }
}
