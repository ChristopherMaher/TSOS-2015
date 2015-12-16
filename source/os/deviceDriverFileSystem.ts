///<reference path="../host/control.ts" />

module TSOS{
    export class DeviceDriverFileSystem extends DeviceDriver {
        constructor() {
            // Override the base method pointers.
            super(this.krnHdDriverEntry, this.krnHdISR);
        }

        public krnHdDriverEntry() {
            // Initialization routine for this, the kernel-mode HD driver.
            this.status = "loaded";
            // More?
        }
        public krnHdISR(params){
            var create = 1;
            var read = 2;
            var write =3;
            var remove =4;
            var format = 5;
            var swap = 6;

            if(params[0]=== create){
                if(this.findFile(params[1]) !== false){
                    _StdOut.putText("File already exists");
                }else {
                    var tSB = this.setDirFile(params[1]);
                    if (params.length > 2) {
                        this.setTSB(tSB, params[2]);
                       // alert(params[2]);
                    }
                }


            }else if(params[0]===read){
                if(this.findFile(params[1]) === false){
                    _StdOut.putText("File doesn't exist");
                }else {
                    var datatsb = this.findFile(params[1]);
                    var readableString = this.readData(datatsb);
                    _StdOut.putText(readableString);
                   // alert("first" + params[1].toString());
                }


            }else if(params[0]===write){
                if(this.findFile(params[1]) === false){
                    _StdOut.putText("File doesn't exist");
                }else {
                    var datatsb = this.findFile(params[1]);
                    this.writeData(datatsb, params[2]);
                }

                //this.setTSB(params);
            }else if(params[0]=== remove){
                if(this.findFile(params[1]) === false){
                    _StdOut.putText("File doesn't exist");
                }else {
                    var tsb = this.findFileRemove(params[1]);
                    this.removeData(tsb);
                    Control.loadFileSystemTable();
                }

            }else if(params[0]=== format){
                this.initTSB();
                Control.loadFileSystemTable();

            }else if(params[0]===swap){
                //alert("this is the first thigs");
                var datatsb=this.findFile(params[1]);
                //alert("Hit");
                var readableArray=this.readUserData(datatsb);
              //  alert("Hit2");
               var tsb= this.findFileRemove(params[1]);
                this.removeData(tsb);
                //alert("Hit2.5");
                this.swapPrograms(readableArray,params[1]);
                //alert("Hit3");
                Control.loadFileSystemTable();



                //return readableArray;
            }

        }

        public initTSB() {

            for (var x = 0; x <= 3; x++) {
                for (var i = 0; i <= 7; i++) {
                    for (var z = 0; z <= 7; z++) {
                        var t = x.toString();
                        var s = i.toString();
                        var b = z.toString();
                        var tsb = t + s + b;
                        this.initsetTSB(tsb, "0");

                    }
                }
            }
            sessionStorage.setItem("000","100011000000");
           // Control.createFileSystemTable();
        //    Control.loadFileSystemTable();
        }

        public initsetTSB(tsb, data) {
            var data = data;

            for (var x = data.length; x <= 124; x++) {
                data = data + "0";
            }
            sessionStorage.setItem(tsb, data);
        }

        public findNextAvailableDataTSB() {
            for (var x = 1; x <= 3; x++) {
                for (var i = 0; i <= 7; i++) {
                    for (var z = 0; z <= 7; z++) {
                        var tsb = (x.toString()).concat(i.toString()).concat(z.toString());
                        var data = sessionStorage.getItem(tsb);
                        if (data.substr(0, 1) === "0") {

                            return tsb;
                        }
                    }
                }
            }
            return "no more space";
        }

        public setTSB(tSB,command) {
            var tsb = tSB;
            var data = command;
            var dataone = data
            var datatwo = "";
            var counter = 0;
            var nextTSB = "";
            while (dataone.length >= 120) {

                nextTSB = this.findNextAvailableDataTSB();
                datatwo = "1" + nextTSB + dataone.substr(0, 120);
                sessionStorage.setItem(nextTSB,datatwo);
                //alert(nextTSB);
                //    alert (dataone.substr(0,120)+tsb);
            //    alert(datatwo);
               // alert(datatwo);
                sessionStorage.setItem(tsb, datatwo);
                //alert(sessionStorage.getItem(tsb));
                //alert(sessionStorage.getItem(tsb));

                //alert("HITHERE");
                tsb = nextTSB;
              //  alert(tsb);

                dataone = dataone.substr(120, dataone.length);
                //alert(dataone);

                counter++;
            }
           // alert(sessionStorage.getItem(tsb));
            for (var x = dataone.length; x <= 119; x++) {
                dataone = dataone + "0";
            }
            datatwo = "1" +"0"+"0"+"0"+ dataone;
            //alert(tsb);
            //tsb = this.findNextAvailableDataTSB();
            sessionStorage.setItem(tsb, datatwo);
         //   alert(sessionStorage.getItem(tsb));
            Control.loadFileSystemTable();

        }
        public findNextAvailableDir(){
                for (var i = 0; i <= 7; i++) {
                    for (var z = 0; z <= 7; z++) {
                        var tsb = "0".concat(i.toString()).concat(z.toString());
                        var data = sessionStorage.getItem(tsb);
                        if (data.substr(0, 1) === "0") {
                            //alert(data.substr(0, 1));
                            //
                            //
                            //
                            // alert(tsb);
                            return tsb;
                        }
                    }

            }

        }
        public  setDirFile(fileName){
           // alert(fileName);

            var fileName = fileName.toString();
            var nameHex = "";
            var counter = 0;
          //  alert(fileName.charCodeAt(0));

            while(counter < fileName.length){

                nameHex= nameHex + (fileName.charCodeAt(counter)).toString(16);
                //alert(nameHex);

                counter++;
            }

            if(nameHex.length < 120) {
                while(nameHex.length < 120){
                    nameHex=nameHex+"0";
                }
                var tsb = this.findNextAvailableDir();
                var dataTSB = this.findNextAvailableDataTSB();
                nameHex="1"+dataTSB+nameHex;
                var tempString= "1";
                while(tempString.length<123){
                    tempString=tempString+"0";
                }

                sessionStorage.setItem(dataTSB,tempString);
                sessionStorage.setItem(tsb,nameHex);
                Control.loadFileSystemTable();
                return dataTSB;


            }else{
                "File name is too long";
            }
            Control.loadFileSystemTable();


        }
        public readData(tsb){
            var data=sessionStorage.getItem(tsb);
            var readableData = "";
            var readableString ="";
            var checkForEnd = false;
            while(checkForEnd === false){
                if(data.substr(1,3)=== "000"){
                    checkForEnd = true;
                }
                readableData=readableData+data.substr(4,120);
                data=sessionStorage.getItem(data.substr(1,3));
            }
            for(var x = 0; x<=readableData.length; x+=2){
              //  alert(readableData);
                readableString=readableString+String.fromCharCode(parseInt(readableData.substr(x,2),16));
                if(readableData.substr(x,2)==="00"){
                   // _StdOut.putText(readableString);
                    break;

                }
            }
           // readableData.toString()
            return readableString;

        }
        public findFile(fileName){
            var fileName= fileName.toString();
            //var length = filename.length;
            var nameHex = "";
            var counter = 0;
            //  alert(fileName.charCodeAt(0));

            while(counter < fileName.length){

                nameHex= nameHex + (fileName.charCodeAt(counter)).toString(16);
                //alert(nameHex);

                counter++;
            }

            if(nameHex.length < 120) {
                while (nameHex.length < 120) {
                    nameHex = nameHex + "0";
                }
            }
            for (var i = 0; i <= 7; i++) {
                for (var z = 0; z <= 7; z++) {
                    var tsb = "0".concat(i.toString()).concat(z.toString());
                    var data = sessionStorage.getItem(tsb);
                    if (data.substr(4,120) === nameHex) {
                        return data.substr(1,3);
                    }
                }

            }
            return false;
        }
        public findFileRemove(fileName){
            var fileName= fileName.toString();
            //var length = filename.length;
            var nameHex = "";
            var counter = 0;
            //  alert(fileName.charCodeAt(0));

            while(counter < fileName.length){

                nameHex= nameHex + (fileName.charCodeAt(counter)).toString(16);
                //alert(nameHex);

                counter++;
            }

            if(nameHex.length < 120) {
                while (nameHex.length < 120) {
                    nameHex = nameHex + "0";
                }
            }
            for (var i = 0; i <= 7; i++) {
                for (var z = 0; z <= 7; z++) {
                    var tsb = "0".concat(i.toString()).concat(z.toString());
                    var data = sessionStorage.getItem(tsb);
                    if (data.substr(4,120) === nameHex) {
                        var replacementString = "";
                        while(replacementString.length<124){
                            replacementString= replacementString+"0";

                        }
                        sessionStorage.setItem(tsb,replacementString);
                        return data.substr(1,3);
                    }
                }

            }
        }
        public writeData(tsb,data) {
            var data = data.toString();
            var dataHex = "";
            var counter = 0;
            //  alert(fileName.charCodeAt(0));

            while (counter < data.length) {

                dataHex = dataHex + (data.charCodeAt(counter)).toString(16);
                //alert(nameHex);

                counter++;
            }
            this.setTSB(tsb,dataHex);
        }
        public removeData(tsb){
            var replacementString = "";
            while(replacementString.length<124){
                replacementString= replacementString+"0";

            }
            var data= sessionStorage.getItem(tsb);
            sessionStorage.setItem(tsb,replacementString);
            if(data.substr(1,3)!== "000"){
                this.removeData(data.substr(1,3));
            }
        }
        public readUserData(tsb){
            //var filetsb =this.findFile(filename);
            var data=sessionStorage.getItem(tsb);
            var readableData = "";
            var readableArray =[];
            var checkForEnd = false;
            var counter=0;
            while(checkForEnd === false){
                if(data.substr(1,3)=== "000"){
                    checkForEnd = true;
                }
                readableData=readableData+data.substr(4,120);
                data=sessionStorage.getItem(data.substr(1,3));
               // alert(data.substr(1,3));
            }
            for(var x = 0; x<=readableData.length; x+=2){

                readableArray[counter]=readableData.substr(x,2);
                counter++;
                if(readableData.substr(x,20)==="00000000000000000000"){
                    // _StdOut.putText(readableString);
                    break;

                }
            }

            return readableArray;
            // readableData.toString()
            //return readableString;
            //return data;
        }
        public swapPrograms(command,pid){
            var base=_MemoryManagement.findAvailableBase();
            var currentProgramtoSwap =100000;
            var currentPriority = 0;
            var fileData="";
            //var oldbase =0;
            var limit =0;
            //alert(_PIDArray);
            if(base !== 2){
                _PIDArray[pid].base = base;
                _PIDArray[pid].limit = base+255;
                _PIDArray[pid].location = "Memory";
                _MemoryManagement.loadInCommand(command,base);



            }else{
               // var inMem = [];
                var counter =0;
                //var counter2= 0;
                while(counter<_PIDArray.length) {
                    if (_PIDArray[counter].location === "Memory") {
                        //add running later
                        if (_PIDArray[counter].state === "New" || _PIDArray[counter].state === "Ready" || _PIDArray[counter].state === "Running" ){ //|| _PIDArray[counter].state === "New"){
                            if(_PIDArray[counter].priority>currentPriority) {
                                currentProgramtoSwap = counter;
                                 currentPriority=_PIDArray[counter].priority;


                            }

                        }
                    }
                    counter++;

                }
                base = _PIDArray[currentProgramtoSwap].base;
           //     alert(_PIDArray[currentProgramtoSwap].base+"HEY");
                limit = _PIDArray[currentProgramtoSwap].limit;
                 fileData=_MemoryManagement.loadBlock(base,limit);

                 _MemoryManagement.resetBaseAvailablity(_PIDArray[currentProgramtoSwap]);
                 _PIDArray[currentProgramtoSwap].base = 2;
                 _PIDArray[currentProgramtoSwap].limit = 0;
                _PIDArray[currentProgramtoSwap].location = "Storage";
              //  this.setDirFile();
                var tSB = this.setDirFile(currentProgramtoSwap);
              //  alert(fileData);
                 this.setTSB(tSB, fileData);

              //  var base=_MemoryManagement.findAvailableBase();
                _PIDArray[pid].base = base;
                _PIDArray[pid].limit = limit;
                _PIDArray[pid].location = "Memory";

                _MemoryManagement.loadInCommand(command, base);
               // alert("HIS is tre"+_PIDArray[_RuningPIDs[0]].base);
                _PIDArray[_RuningPIDs[0]].state = "Running";

                _CPU.setPCB(_RuningPIDs[0]);
               // alert(_RuningPIDs[0]);
               // alert("HIT swappimg");
                _CPU.isExecuting=true;




            }

        }

    }

}