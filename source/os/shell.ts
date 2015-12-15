///<reference path="../globals.ts" />
///<reference path="../utils.ts" />
///<reference path="shellCommand.ts" />
///<reference path="userCommand.ts" />
///<reference path="processControlBlock.ts" />

///<reference path="console.ts" />
///<reference path="deviceDriverFileSystem.ts" />



/* ------------
   Shell.ts

   The OS Shell - The "command line interface" (CLI) for the console.

    Note: While fun and learning are the primary goals of all enrichment center activities,
          serious injuries may occur when trying to write your own Operating System.
   ------------ */

// TODO: Write a base class / prototype for system services and let Shell inherit from it.

module TSOS {
    export class Shell {
        // Properties
        public promptStr = ">";
        public commandList = [];
        public curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
        public apologies = "[sorry]";

        constructor() {
        }

        public init() {
            var sc;
           // var newCommand;
            //
            // Load the command list.

            // ver
            sc = new ShellCommand(this.shellVer,
                                  "ver",
                                  "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;

            // help
            sc = new ShellCommand(this.shellHelp,
                                  "help",
                                  "- This is the help command. Seek help.");

            this.commandList[this.commandList.length] = sc;

            // shutdown
            sc = new ShellCommand(this.shellShutdown,
                                  "shutdown",
                                  "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;

            // cls
            sc = new ShellCommand(this.shellCls,
                                  "cls",
                                  "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;

            // man <topic>
            sc = new ShellCommand(this.shellMan,
                                  "man",
                                  "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;

            // trace <on | off>
            sc = new ShellCommand(this.shellTrace,
                                  "trace",
                                  "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;

            // rot13 <string>
            sc = new ShellCommand(this.shellRot13,
                                  "rot13",
                                  "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;

            // prompt <string>
            sc = new ShellCommand(this.shellPrompt,
                                  "prompt",
                                  "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;
            //date
            sc = new ShellCommand(this.shellDate,
                                  "date",
                                  "-Displays the current date and time");
            this.commandList[this.commandList.length] = sc;

            //bsod
            sc = new ShellCommand(this.shellBsod,
                                  "bsod",
                                   "-Causes a Blue Screen of death");
            this.commandList[this.commandList.length] = sc;

            //Whereami
            sc = new ShellCommand(this.shellWhereami,
                                    "whereami",
                                    "-Displays the user's current location");
            this.commandList[this.commandList.length] = sc;

            //Fontcolor
            sc  = new ShellCommand(this.shellFontColor,
                                     "fontcolor",
                                    "<color>-Changes the font color<color>");
            this.commandList[this.commandList.length] = sc;

            //load
            sc = new ShellCommand(this.shellLoad,
                                  "load",
                                  "-Validates the user code");
            this.commandList[this.commandList.length] = sc;

            //status
            sc = new ShellCommand(this.shellStatus,
                                   "status",
                                   "<string>-echos the command to the graphic task bar<string>");
            this.commandList[this.commandList.length] = sc;


            sc = new ShellCommand(this.shellClearMem,
                "clearmem",
                "Clears the memory of all the memory partitions");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shellRun,
                "run",
                "<number>-echos the command to the graphic task bar<number>");
            this.commandList[this.commandList.length] = sc;


            sc = new ShellCommand(this.shellQuantum,
                "quantum",
                "<number>-changes the quantum number<number>");
            this.commandList[this.commandList.length] = sc;


            sc = new ShellCommand(this.shellRunAll,
                "runall",
                "Runs all of the stored programs");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shellKill,
                "kill",
                "<number>kills selected PID<number>");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shellPs,
                "ps",
                "lists all of the running programs");
            this.commandList[this.commandList.length] = sc;


            sc = new ShellCommand(this.shellCreate,
                "create",
                "<string>-creates a new file<string>");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shellRead,
                "read",
                "<string>-reads a file<string>");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shellWrite,
                "write",
                "<string> \"data\" -writes to a specified file");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shellRemove,
                "remove",
                "<string> -Removes a specified file");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shellFormat,
                "format",
                "-formats the harddrive");
            this.commandList[this.commandList.length] = sc;

            sc = new ShellCommand(this.shellSetschedule,
                "setschedule",
                "<string>-changes the scheduler");
            this.commandList[this.commandList.length] = sc;





            // ps  - list the running processes and their IDs
            // kill <id> - kills the specified process id.



            //
            // Display the initial prompt.

            this.putPrompt();

        }

        public putPrompt() {
            _StdOut.putText(this.promptStr);
        }

        public handleInput(buffer) {
            _Kernel.krnTrace("Shell Command~" + buffer);
            //
            // Parse the input...
            //
            var userCommand = this.parseInput(buffer);
            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;
            var args = userCommand.args;
            //
            // Determine the command and execute it.
            //
            // TypeScript/JavaScript may not support associative arrays in all browsers so we have to iterate over the
            // command list in attempt to find a match.  TODO: Is there a better way? Probably. Someone work it out and tell me in class.
            var index: number = 0;
            var found: boolean = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                } else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args);
            } else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + Utils.rot13(cmd) + "]") >= 0) {     // Check for curses.
                    this.execute(this.shellCurse);
                } else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {        // Check for apologies.
                    this.execute(this.shellApology);
                } else { // It's just a bad command. {
                    this.execute(this.shellInvalidCommand);
                }
            }
        }

        // Note: args is an option parameter, ergo the ? which allows TypeScript to understand that.
        public execute(fn, args?) {
            // We just got a command, so advance the line...
            _StdOut.advanceLine();
            // ... call the command function passing in the args with some über-cool functional programming ...
            fn(args);
            // Check to see if we need to advance the line again
            if (_StdOut.currentXPosition > 0) {
                _StdOut.advanceLine();
            }
            // ... and finally write the prompt again.
            this.putPrompt();
        }

        public parseInput(buffer): UserCommand {
            var retVal = new UserCommand();

            // 1. Remove leading and trailing spaces.
            buffer = Utils.trim(buffer);

            // 2. Lower-case it.
            buffer = buffer.toLowerCase();

            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");

            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift();  // Yes, you can do that to an array in JavaScript.  See the Queue class.
            // 4.1 Remove any left-over spaces.
            cmd = Utils.trim(cmd);
            // 4.2 Record it in the return value.
            retVal.command = cmd;

            // 5. Now create the args array from what's left.
            for (var i in tempList) {
                var arg = Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        }
        public checkOPCode(usercommand){
            var counter = 0;
            var check = true;
            while(check == true){
                if(usercommand[counter]==="A9"){
                    counter++;
                    counter++;
                }else if(usercommand[counter]=== "8D"){
                    counter++;
                    counter++;
                    counter++;
                }else if(usercommand[counter]=== "00"){
                    check = false;
                    return true;

                }else if(usercommand[counter]=== "AD"){
                    counter++;
                    counter++;
                    counter++;

                }else if(usercommand[counter]=== "AC"){
                    counter++;
                    counter++;
                    counter++;
                }else if(usercommand[counter]=== "AE"){
                    counter++;
                    counter++;
                    counter++;

                }else if(usercommand[counter]=== "6D"){
                    counter++;
                    counter++;
                    counter++;

                }else if(usercommand[counter]=== "A2"){
                    counter++;
                    counter++;

                }else if(usercommand[counter]=== "A0"){
                    counter++;
                    counter++;

                }else if(usercommand[counter]=== "EC"){
                    counter++;
                    counter++;
                    counter++;

                }else if(usercommand[counter]=== "EE"){
                    counter++;
                    counter++;
                    counter++;

                }else if(usercommand[counter]=== "FF"){
                    counter++;

                }
                else if(usercommand[counter]=== "D0"){
                    counter++;
                    counter++;

                }else{
                    check = false;
                    return false;
                }


            }

        }

        //
        // Shell Command Functions.  Kinda not part of Shell() class exactly, but
        // called from here, so kept here to avoid violating the law of least astonishment.
        //
        public shellInvalidCommand() {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Unbelievable. You, [subject name here],");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of [subject hometown here].");
            } else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        }

        public shellCurse() {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        }

        public shellApology() {
           if (_SarcasticMode) {
              _StdOut.putText("I think we can put our differences behind us.");
              _StdOut.advanceLine();
              _StdOut.putText("For science . . . You monster.");
              _SarcasticMode = false;
           } else {
              _StdOut.putText("For what?");
           }
        }

        public shellVer(args) {
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
        }

        public shellHelp(args) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        }

        public shellShutdown(args) {
             _StdOut.putText("Shutting down...");
             // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
        }

        public shellCls(args) {
            _StdOut.clearScreen();
            _StdOut.resetXY();
        }

        public shellMan(args) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    case "ver":
                        _StdOut.putText("Shows the current version.");
                        break;
                    case "load":
                        _StdOut.putText("Name:load - Loads in the user input and checks to see if it");
                        _StdOut.advanceLine();
                        _StdOut.putText(" is valid haxi digits.");

                        break;
                    case "fontcolor":
                        _StdOut.putText("Name:fontcolor - changes the font to a specified color.");
                        _StdOut.advanceLine();

                        _StdOut.putText("Ex:fontcolor blue.");

                        break;
                    case "man":
                        _StdOut.putText("Name: man - Displays the manual pages");

                        break;

                    case "cls":
                        _StdOut.putText("Name: cls - clears the shell and resets the cursor");

                        break;
                    case "whereami":
                        _StdOut.putText("Name: whereami - Displays the user's current location");

                        break;
                    case "trace":
                        _StdOut.putText("Name: trace - Turns the trace either on or off");
                        _StdOut.advanceLine();
                        _StdOut.putText("Ex: trace on");
                        break;

                    case "rot13":
                        _StdOut.putText("Name: rot13 - Does rot13 obfuscation on inputted string");
                        _StdOut.advanceLine();
                        _StdOut.putText("Ex: rot13 on ");
                        _StdOut.advanceLine();
                        _StdOut.putText("A letter substitution ciper which replaces a letter with ");
                        _StdOut.advanceLine();
                        _StdOut.putText("13 letters after it");

                        break;

                    case "bsod":
                        _StdOut.putText("Name: bsod - enables a kernal panick which causes");
                        _StdOut.advanceLine();
                        _StdOut.putText(" a blue screen of death");

                        break;
                    case "prompt":
                        _StdOut.putText("Name: prompt - prompts the shell with a specified string");
                        _StdOut.advanceLine();
                        _StdOut.putText("prompt dog");

                        break;


                    case "date":
                        _StdOut.putText("Name: date - Displays the current date in month day year");
                        _StdOut.advanceLine();
                        _StdOut.putText("Along with the current time");

                        break;

                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            } else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic. ");
            }
        }

        public shellTrace(args) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, doofus.");
                        } else {
                            _Trace = true;
                            _StdOut.putText("Trace ON");
                        }
                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            } else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        }

        public shellRot13(args) {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + Utils.rot13(args.join(' ')) +"'");
            } else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        }

        public shellPrompt(args) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            } else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        }
        public shellDate() {
            var date = new Date().toLocaleDateString();
            var current_time = new Date();
            _StdOut.putText(date+",");
            _StdOut.putText(JSON.stringify(current_time.getHours())+":"+JSON.stringify(current_time.getMinutes())+":"+JSON.stringify(current_time.getUTCSeconds()));

        }
        public  shellBsod(){
            _Kernel.krnTrapError("Testing the BSOD");

        }
        public  shellWhereami(){
            _StdOut.putText("On your chair");

        }
        public  shellFontColor(color){
            _FontColor = color;

        }
        public  shellLoad(){
            var userInput = (<HTMLInputElement>document.getElementById("taProgramInput")).value;
            var regexp = new RegExp('^[0-9A-Fa-f\\s]+$'); //matches only for hex digits

            if(regexp.test(userInput)==true) {
                userInput = userInput.replace(/\r?\n|\r/g, "");
                var userProgramArray = userInput.split(" ");
                var checker =  _OsShell.checkOPCode(userProgramArray);

                if (checker == true) {

                    if (userProgramArray.length < 256) { //checks the length to prevent memory overflow

                        var base = _MemoryManagement.findAvailableBase();

                        if (base === 2) {  //temporary fix
                       //     var tsb = _FileSystem.findNextAvailableDataTSB();
                            var tsb = _FileSystem.findNextAvailableDir();
                            var commands = userInput.replace(/ /g,"");
                            //may need to add one, for continuity sake
                            _KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ,[1,_PIDArray.length,commands]));
                            //alert(commands);
                            var priority = 0;
                            var pcb = new PCB(_PIDArray.length + 1, 0, "New", 0, 0, 0, 0, 2, 0, "Storage",tsb,priority);

                            _PIDArray.push(pcb);

                            _PCB = pcb;

                            _StdOut.putText("Valid Code, PID==" + JSON.stringify(_PIDArray.length - 1));


                        } else {


                            _MemoryManagement.loadInCommand(userProgramArray, base);

                            var priority = 0;
                            var pcb = new PCB(_PIDArray.length + 1, 0, "New", 0, 0, 0, 0, base, base + 255, "Memory","mem",priority);

                            _PIDArray.push(pcb);

                            _PCB = pcb;

                            _StdOut.putText("Valid Code, PID==" + JSON.stringify(_PIDArray.length - 1));
                        }
                    } else {
                        _StdOut.putText("Memory Overflow");
                    }

                } else {
                   // _StdOut.putText("Error:User code can only use Hex digits.");
                    _StdOut.putText("Invalid OP Codes");

                }
            }else{
                _StdOut.putText("Error:User code can only use Hex digits.");
               // _StdOut.putText("Invalid OP Codes");

            }

        }
        public shellStatus(args){
            var arrayToString = args.toString();
            var text = arrayToString.replace(/,/g, " ");
            var date = new Date().toLocaleDateString();
            var current_time = new Date();
            var displayText = text + "   "+date+" "+JSON.stringify(current_time.getHours())+
                ":"+JSON.stringify(current_time.getMinutes())+":"+JSON.stringify(current_time.getUTCSeconds());
            (<HTMLInputElement>document.getElementById("taGraphicTaskBar")).value = displayText;
        }
        public shellRun(args){
            if(_PIDArray.length -1 < args){
                _StdOut("PID number is not valid");
            }else if(_PIDArray[args] == null){
                _StdOut("PID number is not valid");
            }else{
                _PIDArray[args].state = "Ready";
                if(_PIDArray[args].location === "Storage"){
                    var pid=args;
                    //look out for number/string conflicts
                 //   setTimout(_KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ, [6, pid])),1000);
                  //  setTimeout( () => {
                        _KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ, [6, pid]));
                  //  }, 3000);



//                        _KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ, [6, pid]));

                    //var command
                }
                args=_PIDArray[args].pid -1;

                _RuningPIDs.push(args);
                _PIDArray[_RuningPIDs[0]].state = "Running";

                setTimeout( () => {
                    //_RuningPIDs.push(args);
                   // _PIDArray[_RuningPIDs[0]].state = "Running";
                    //this.test(args);
                    _CPU.isExecuting = true;


                    ///  _RuningPIDs.push(args);
               // _PIDArray[_RuningPIDs[0]].state = "Running";

                //_StdOut.putText(JSON.stringify(args));

             //   _CPU.isExecuting = true;
                }, 1000);



            }

        }
        public test(args){
           // args=_PIDArray[args].pid -1;
       //     alert("HEY still fucked");
            //alert("hey this made it"+args);



         //   _RuningPIDs.push(args);
           // alert(_PIDArray[_RuningPIDs[0]].pid);
 //           alert(_PIDArray[_RuningPIDs[0]].base);
//
            //_StdOut.putText(JSON.stringify(args));

            _CPU.isExecuting = true;
        }
        public shellRunAll(){
            var counter = 0;
            while(_PIDArray.length > counter) {
                //   _StdOut.putText("RUNNING");
                if (_PIDArray[counter].state !== "Executed") {
                    if (_PIDArray[counter].state !== "Ready") {
                        if (_PIDArray[counter].state !== "Running") {
                            _PIDArray[counter].state = "Ready";
                            _RuningPIDs.push(counter)
                            _CPU.isExecuting = true;;

                        }
                    }

                }
                counter++;
            }
            _PIDArray[_RuningPIDs[0]].state = "Running";
        }
        public shellClearMem(){
            //need to fix
            var counter = 0;
            while(_PIDArray.length>counter){
                if(_PIDArray[counter].state !== "Executed" && _PIDArray[counter].location!=="Storage") {

                    _PIDArray[counter].state = "Executed";
                }
                if(_PIDArray[counter].state === "Running"&& _PIDArray[counter].location!=="Storage"){
                    _CPU.isExecuting = false;
                    _RuningPIDs.shift();

                }
                if(_PIDArray[counter].state === "Ready" && _PIDArray[counter].location!=="Storage"){
                    _CPU.isExecuting = false;
                    _RuningPIDs.shift();

                }
                counter++;
            }
            _MemoryManagement.resetMemory(0,768);
            _MemoryManagement.resetBaseAvailablity(0);
            _MemoryManagement.resetBaseAvailablity(256);
            _MemoryManagement.resetBaseAvailablity(512);
            Control.loadTable();


            _StdOut.putText("Cleared Memory");
        }
        public shellQuantum(quantumNumber){
            _QuantumNumber = quantumNumber;
        }
        public shellPs(){
            _StdOut.putText("Running Programs:");
            _StdOut.putText(JSON.stringify(_RuningPIDs[0]));
            _StdOut.putText(JSON.stringify(_RuningPIDs[1]));
            _StdOut.putText(JSON.stringify(_RuningPIDs[2]));
        }


        public shellKill(pid){
            var temp = _RuningPIDs[0];
            if(temp == pid){
                _PIDArray[_RuningPIDs[0]].state = "Executed";
                _MemoryManagement.resetMemory(_PIDArray[_RuningPIDs[0]].base,_PIDArray[_RuningPIDs[0]].limit);
                _MemoryManagement.resetBaseAvailablity(_PIDArray[_RuningPIDs[0]].base);
                _StdOut.putText("Selected Program has been killed");

            }else if(_RuningPIDs[1] == pid){
                _PIDArray[_RuningPIDs[1]].state = "Executed";
                _MemoryManagement.resetMemory(_PIDArray[_RuningPIDs[1]].base,_PIDArray[_RuningPIDs[1]].limit);
                _MemoryManagement.resetBaseAvailablity(_PIDArray[_RuningPIDs[1]].base);
                _StdOut.putText("Selected Program has been killed");

            }else if(_RuningPIDs[2] == pid){
                _PIDArray[_RuningPIDs[2]].state = "Executed";
                _MemoryManagement.resetMemory(_PIDArray[_RuningPIDs[2]].base,_PIDArray[_RuningPIDs[2]].limit);
                _MemoryManagement.resetBaseAvailablity(_PIDArray[_RuningPIDs[2]].base);
                _StdOut.putText("Selected Program has been killed");

            }else{
                _StdOut.putText("Selected Program is not active");

            }

        }
        public shellCreate(filename){
            _KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ,[1,filename]));


        }
        public shellRead(filename){
            _KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ,[2,filename]));

        }
        public shellWrite(args){
            if(args.length >= 2) {
                var filename = args[0];
                var data = args[1];
                    if(data.substr(0,1) === "\""){
                        data=data.slice(1,data.length);
                        if(data.substr(data.length-1,data.length)==="\""){
                            data=data.slice(0,data.length-1);
                            _KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ, [3, filename, data]));
                        }else{
                            _StdOut.putText("Data needs to be in string format");

                        }


                    }else{
                            _StdOut.putText("Data needs to be in string format");
                        }




            }else{
                _StdOut.putText("Error");
            }
        }
        public shellRemove(filename){
            _KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ,[4,filename]));

        }
        public shellFormat(){
            _KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ,[5]));

        }
        public shellSetschedule(schedule){
          //  _KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ,[5]));

            if(schedule == "fcfs"){
                _ScheduleType = "FCFS";
            }else if(schedule == "FCFS"){
                _ScheduleType = "FCFS";

            }else if(schedule == "rr"){
                _ScheduleType ="RR";
            }else if(schedule == "priority"){
                _ScheduleType="priority";
            }else{
                _StdOut.putText("schedule doesn't exitst");
            }


        }







    }
}
