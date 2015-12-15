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
var TSOS;
(function (TSOS) {
    var Shell = (function () {
        function Shell() {
            // Properties
            this.promptStr = ">";
            this.commandList = [];
            this.curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
            this.apologies = "[sorry]";
        }
        Shell.prototype.init = function () {
            var sc;
            // var newCommand;
            //
            // Load the command list.
            // ver
            sc = new TSOS.ShellCommand(this.shellVer, "ver", "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;
            // help
            sc = new TSOS.ShellCommand(this.shellHelp, "help", "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;
            // shutdown
            sc = new TSOS.ShellCommand(this.shellShutdown, "shutdown", "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;
            // cls
            sc = new TSOS.ShellCommand(this.shellCls, "cls", "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;
            // man <topic>
            sc = new TSOS.ShellCommand(this.shellMan, "man", "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;
            // trace <on | off>
            sc = new TSOS.ShellCommand(this.shellTrace, "trace", "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;
            // rot13 <string>
            sc = new TSOS.ShellCommand(this.shellRot13, "rot13", "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;
            // prompt <string>
            sc = new TSOS.ShellCommand(this.shellPrompt, "prompt", "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;
            //date
            sc = new TSOS.ShellCommand(this.shellDate, "date", "-Displays the current date and time");
            this.commandList[this.commandList.length] = sc;
            //bsod
            sc = new TSOS.ShellCommand(this.shellBsod, "bsod", "-Causes a Blue Screen of death");
            this.commandList[this.commandList.length] = sc;
            //Whereami
            sc = new TSOS.ShellCommand(this.shellWhereami, "whereami", "-Displays the user's current location");
            this.commandList[this.commandList.length] = sc;
            //Fontcolor
            sc = new TSOS.ShellCommand(this.shellFontColor, "fontcolor", "<color>-Changes the font color<color>");
            this.commandList[this.commandList.length] = sc;
            //load
            sc = new TSOS.ShellCommand(this.shellLoad, "load", "-Validates the user code");
            this.commandList[this.commandList.length] = sc;
            //status
            sc = new TSOS.ShellCommand(this.shellStatus, "status", "<string>-echos the command to the graphic task bar<string>");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellClearMem, "clearmem", "Clears the memory of all the memory partitions");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellRun, "run", "<number>-echos the command to the graphic task bar<number>");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellQuantum, "quantum", "<number>-changes the quantum number<number>");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellRunAll, "runall", "Runs all of the stored programs");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellKill, "kill", "<number>kills selected PID<number>");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellPs, "ps", "lists all of the running programs");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellCreate, "create", "<string>-creates a new file<string>");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellRead, "read", "<string>-reads a file<string>");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellWrite, "write", "<string> \"data\" -writes to a specified file");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellRemove, "remove", "<string> -Removes a specified file");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellFormat, "format", "-formats the harddrive");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellSelectschedule, "selectschedule", "<string>-changes the scheduler");
            this.commandList[this.commandList.length] = sc;
            // ps  - list the running processes and their IDs
            // kill <id> - kills the specified process id.
            //
            // Display the initial prompt.
            this.putPrompt();
        };
        Shell.prototype.putPrompt = function () {
            _StdOut.putText(this.promptStr);
        };
        Shell.prototype.handleInput = function (buffer) {
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
            var index = 0;
            var found = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                }
                else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args);
            }
            else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + TSOS.Utils.rot13(cmd) + "]") >= 0) {
                    this.execute(this.shellCurse);
                }
                else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {
                    this.execute(this.shellApology);
                }
                else {
                    this.execute(this.shellInvalidCommand);
                }
            }
        };
        // Note: args is an option parameter, ergo the ? which allows TypeScript to understand that.
        Shell.prototype.execute = function (fn, args) {
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
        };
        Shell.prototype.parseInput = function (buffer) {
            var retVal = new TSOS.UserCommand();
            // 1. Remove leading and trailing spaces.
            buffer = TSOS.Utils.trim(buffer);
            // 2. Lower-case it.
            buffer = buffer.toLowerCase();
            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");
            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift(); // Yes, you can do that to an array in JavaScript.  See the Queue class.
            // 4.1 Remove any left-over spaces.
            cmd = TSOS.Utils.trim(cmd);
            // 4.2 Record it in the return value.
            retVal.command = cmd;
            // 5. Now create the args array from what's left.
            for (var i in tempList) {
                var arg = TSOS.Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        };
        Shell.prototype.checkOPCode = function (usercommand) {
            var counter = 0;
            var check = true;
            while (check == true) {
                if (usercommand[counter] === "A9") {
                    counter++;
                    counter++;
                }
                else if (usercommand[counter] === "8D") {
                    counter++;
                    counter++;
                    counter++;
                }
                else if (usercommand[counter] === "00") {
                    check = false;
                    return true;
                }
                else if (usercommand[counter] === "AD") {
                    counter++;
                    counter++;
                    counter++;
                }
                else if (usercommand[counter] === "AC") {
                    counter++;
                    counter++;
                    counter++;
                }
                else if (usercommand[counter] === "AE") {
                    counter++;
                    counter++;
                    counter++;
                }
                else if (usercommand[counter] === "6D") {
                    counter++;
                    counter++;
                    counter++;
                }
                else if (usercommand[counter] === "A2") {
                    counter++;
                    counter++;
                }
                else if (usercommand[counter] === "A0") {
                    counter++;
                    counter++;
                }
                else if (usercommand[counter] === "EC") {
                    counter++;
                    counter++;
                    counter++;
                }
                else if (usercommand[counter] === "EE") {
                    counter++;
                    counter++;
                    counter++;
                }
                else if (usercommand[counter] === "FF") {
                    counter++;
                }
                else if (usercommand[counter] === "D0") {
                    counter++;
                    counter++;
                }
                else {
                    check = false;
                    return false;
                }
            }
        };
        //
        // Shell Command Functions.  Kinda not part of Shell() class exactly, but
        // called from here, so kept here to avoid violating the law of least astonishment.
        //
        Shell.prototype.shellInvalidCommand = function () {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Unbelievable. You, [subject name here],");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of [subject hometown here].");
            }
            else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        };
        Shell.prototype.shellCurse = function () {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        };
        Shell.prototype.shellApology = function () {
            if (_SarcasticMode) {
                _StdOut.putText("I think we can put our differences behind us.");
                _StdOut.advanceLine();
                _StdOut.putText("For science . . . You monster.");
                _SarcasticMode = false;
            }
            else {
                _StdOut.putText("For what?");
            }
        };
        Shell.prototype.shellVer = function (args) {
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
        };
        Shell.prototype.shellHelp = function (args) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        };
        Shell.prototype.shellShutdown = function (args) {
            _StdOut.putText("Shutting down...");
            // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
        };
        Shell.prototype.shellCls = function (args) {
            _StdOut.clearScreen();
            _StdOut.resetXY();
        };
        Shell.prototype.shellMan = function (args) {
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
            }
            else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic. ");
            }
        };
        Shell.prototype.shellTrace = function (args) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, doofus.");
                        }
                        else {
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
            }
            else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        };
        Shell.prototype.shellRot13 = function (args) {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + TSOS.Utils.rot13(args.join(' ')) + "'");
            }
            else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        };
        Shell.prototype.shellPrompt = function (args) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            }
            else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        };
        Shell.prototype.shellDate = function () {
            var date = new Date().toLocaleDateString();
            var current_time = new Date();
            _StdOut.putText(date + ",");
            _StdOut.putText(JSON.stringify(current_time.getHours()) + ":" + JSON.stringify(current_time.getMinutes()) + ":" + JSON.stringify(current_time.getUTCSeconds()));
        };
        Shell.prototype.shellBsod = function () {
            _Kernel.krnTrapError("Testing the BSOD");
        };
        Shell.prototype.shellWhereami = function () {
            _StdOut.putText("On your chair");
        };
        Shell.prototype.shellFontColor = function (color) {
            _FontColor = color;
        };
        Shell.prototype.shellLoad = function () {
            var userInput = document.getElementById("taProgramInput").value;
            var regexp = new RegExp('^[0-9A-Fa-f\\s]+$'); //matches only for hex digits
            if (regexp.test(userInput) == true) {
                userInput = userInput.replace(/\r?\n|\r/g, "");
                var userProgramArray = userInput.split(" ");
                var checker = _OsShell.checkOPCode(userProgramArray);
                if (checker == true) {
                    if (userProgramArray.length < 256) {
                        var base = _MemoryManagement.findAvailableBase();
                        if (base === 2) {
                            //     var tsb = _FileSystem.findNextAvailableDataTSB();
                            var tsb = _FileSystem.findNextAvailableDir();
                            var commands = userInput.replace(/ /g, "");
                            //may need to add one, for continuity sake
                            _KernelInterruptQueue.enqueue(new TSOS.Interrupt(FILESYSTEM_IRQ, [1, _PIDArray.length, commands]));
                            //alert(commands);
                            var priority = 0;
                            var pcb = new TSOS.PCB(_PIDArray.length + 1, 0, "New", 0, 0, 0, 0, 2, 0, "Storage", tsb, priority);
                            _PIDArray.push(pcb);
                            _PCB = pcb;
                            _StdOut.putText("Valid Code, PID==" + JSON.stringify(_PIDArray.length - 1));
                        }
                        else {
                            _MemoryManagement.loadInCommand(userProgramArray, base);
                            var priority = 0;
                            var pcb = new TSOS.PCB(_PIDArray.length + 1, 0, "New", 0, 0, 0, 0, base, base + 255, "Memory", "mem", priority);
                            _PIDArray.push(pcb);
                            _PCB = pcb;
                            _StdOut.putText("Valid Code, PID==" + JSON.stringify(_PIDArray.length - 1));
                        }
                    }
                    else {
                        _StdOut.putText("Memory Overflow");
                    }
                }
                else {
                    // _StdOut.putText("Error:User code can only use Hex digits.");
                    _StdOut.putText("Invalid OP Codes");
                }
            }
            else {
                _StdOut.putText("Error:User code can only use Hex digits.");
            }
        };
        Shell.prototype.shellStatus = function (args) {
            var arrayToString = args.toString();
            var text = arrayToString.replace(/,/g, " ");
            var date = new Date().toLocaleDateString();
            var current_time = new Date();
            var displayText = text + "   " + date + " " + JSON.stringify(current_time.getHours()) +
                ":" + JSON.stringify(current_time.getMinutes()) + ":" + JSON.stringify(current_time.getUTCSeconds());
            document.getElementById("taGraphicTaskBar").value = displayText;
        };
        Shell.prototype.shellRun = function (args) {
            if (_PIDArray.length - 1 < args) {
                _StdOut("PID number is not valid");
            }
            else if (_PIDArray[args] == null) {
                _StdOut("PID number is not valid");
            }
            else {
                _PIDArray[args].state = "Ready";
                if (_PIDArray[args].location === "Storage") {
                    var pid = args;
                    //look out for number/string conflicts
                    //   setTimout(_KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ, [6, pid])),1000);
                    //  setTimeout( () => {
                    _KernelInterruptQueue.enqueue(new TSOS.Interrupt(FILESYSTEM_IRQ, [6, pid]));
                }
                args = _PIDArray[args].pid - 1;
                _RuningPIDs.push(args);
                _PIDArray[_RuningPIDs[0]].state = "Running";
                setTimeout(function () {
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
        };
        Shell.prototype.test = function (args) {
            // args=_PIDArray[args].pid -1;
            //     alert("HEY still fucked");
            //alert("hey this made it"+args);
            //   _RuningPIDs.push(args);
            // alert(_PIDArray[_RuningPIDs[0]].pid);
            //           alert(_PIDArray[_RuningPIDs[0]].base);
            //
            //_StdOut.putText(JSON.stringify(args));
            _CPU.isExecuting = true;
        };
        Shell.prototype.shellRunAll = function () {
            var counter = 0;
            while (_PIDArray.length > counter) {
                //   _StdOut.putText("RUNNING");
                if (_PIDArray[counter].state !== "Executed") {
                    if (_PIDArray[counter].state !== "Ready") {
                        if (_PIDArray[counter].state !== "Running") {
                            _PIDArray[counter].state = "Ready";
                            _RuningPIDs.push(counter);
                            _CPU.isExecuting = true;
                            ;
                        }
                    }
                }
                counter++;
            }
            _PIDArray[_RuningPIDs[0]].state = "Running";
        };
        Shell.prototype.shellClearMem = function () {
            //need to fix
            var counter = 0;
            while (_PIDArray.length > counter) {
                if (_PIDArray[counter].state !== "Executed" && _PIDArray[counter].location !== "Storage") {
                    _PIDArray[counter].state = "Executed";
                }
                if (_PIDArray[counter].state === "Running" && _PIDArray[counter].location !== "Storage") {
                    _CPU.isExecuting = false;
                    _RuningPIDs.shift();
                }
                if (_PIDArray[counter].state === "Ready" && _PIDArray[counter].location !== "Storage") {
                    _CPU.isExecuting = false;
                    _RuningPIDs.shift();
                }
                counter++;
            }
            _MemoryManagement.resetMemory(0, 768);
            _MemoryManagement.resetBaseAvailablity(0);
            _MemoryManagement.resetBaseAvailablity(256);
            _MemoryManagement.resetBaseAvailablity(512);
            TSOS.Control.loadTable();
            _StdOut.putText("Cleared Memory");
        };
        Shell.prototype.shellQuantum = function (quantumNumber) {
            _QuantumNumber = quantumNumber;
        };
        Shell.prototype.shellPs = function () {
            _StdOut.putText("Running Programs:");
            _StdOut.putText(JSON.stringify(_RuningPIDs[0]));
            _StdOut.putText(JSON.stringify(_RuningPIDs[1]));
            _StdOut.putText(JSON.stringify(_RuningPIDs[2]));
        };
        Shell.prototype.shellKill = function (pid) {
            var temp = _RuningPIDs[0];
            if (temp == pid) {
                _PIDArray[_RuningPIDs[0]].state = "Executed";
                _MemoryManagement.resetMemory(_PIDArray[_RuningPIDs[0]].base, _PIDArray[_RuningPIDs[0]].limit);
                _MemoryManagement.resetBaseAvailablity(_PIDArray[_RuningPIDs[0]].base);
                _StdOut.putText("Selected Program has been killed");
            }
            else if (_RuningPIDs[1] == pid) {
                _PIDArray[_RuningPIDs[1]].state = "Executed";
                _MemoryManagement.resetMemory(_PIDArray[_RuningPIDs[1]].base, _PIDArray[_RuningPIDs[1]].limit);
                _MemoryManagement.resetBaseAvailablity(_PIDArray[_RuningPIDs[1]].base);
                _StdOut.putText("Selected Program has been killed");
            }
            else if (_RuningPIDs[2] == pid) {
                _PIDArray[_RuningPIDs[2]].state = "Executed";
                _MemoryManagement.resetMemory(_PIDArray[_RuningPIDs[2]].base, _PIDArray[_RuningPIDs[2]].limit);
                _MemoryManagement.resetBaseAvailablity(_PIDArray[_RuningPIDs[2]].base);
                _StdOut.putText("Selected Program has been killed");
            }
            else {
                _StdOut.putText("Selected Program is not active");
            }
        };
        Shell.prototype.shellCreate = function (filename) {
            _KernelInterruptQueue.enqueue(new TSOS.Interrupt(FILESYSTEM_IRQ, [1, filename]));
        };
        Shell.prototype.shellRead = function (filename) {
            _KernelInterruptQueue.enqueue(new TSOS.Interrupt(FILESYSTEM_IRQ, [2, filename]));
        };
        Shell.prototype.shellWrite = function (args) {
            if (args.length >= 2) {
                var filename = args[0];
                var data = args[1];
                if (data.substr(0, 1) === "\"") {
                    data = data.slice(1, data.length);
                    if (data.substr(data.length - 1, data.length) === "\"") {
                        data = data.slice(0, data.length - 1);
                        _KernelInterruptQueue.enqueue(new TSOS.Interrupt(FILESYSTEM_IRQ, [3, filename, data]));
                    }
                    else {
                        _StdOut.putText("Data needs to be in string format");
                    }
                }
                else {
                    _StdOut.putText("Data needs to be in string format");
                }
            }
            else {
                _StdOut.putText("Error");
            }
        };
        Shell.prototype.shellRemove = function (filename) {
            _KernelInterruptQueue.enqueue(new TSOS.Interrupt(FILESYSTEM_IRQ, [4, filename]));
        };
        Shell.prototype.shellFormat = function () {
            _KernelInterruptQueue.enqueue(new TSOS.Interrupt(FILESYSTEM_IRQ, [5]));
        };
        Shell.prototype.shellSelectschedule = function (schedule) {
            //  _KernelInterruptQueue.enqueue(new Interrupt(FILESYSTEM_IRQ,[5]));
            alert(schedule);
            if (schedule == "firstcomefirstserve") {
                _ScheduleType = "FCFS";
            }
            if (schedule == "fcfs") {
                _ScheduleType = "FCFS";
            }
            if (schedule == "FCFS") {
                _ScheduleType = "FCFS";
            }
            alert(_ScheduleType);
        };
        return Shell;
    })();
    TSOS.Shell = Shell;
})(TSOS || (TSOS = {}));
