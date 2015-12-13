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
          //  var write2 = 6;

            if(params[0]=== create){
                var tSB=this.setDirFile(params[1]);
                if(params.length>2){
                    this.setTSB(tSB,params[2]);
                }


            }else if(params[0]===read){
               var datatsb=this.findFile(params[1]);
                this.readData(datatsb);


            }else if(params[0]===write){
                var datatsb =this.findFile(params[1]);
                this.writeData(datatsb,params[2]);

                //this.setTSB(params);
            }else if(params[0]=== remove){
                var tsb=this.findFileRemove(params[1]);
                this.removeData(tsb);
                Control.loadFileSystemTable();

            }else if(params[0]=== format){
                this.initTSB();
                Control.loadFileSystemTable();

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
            localStorage.setItem("000","100011000000");
           // Control.createFileSystemTable();
        //    Control.loadFileSystemTable();
        }

        public initsetTSB(tsb, data) {
            var data = data;

            for (var x = data.length; x <= 124; x++) {
                data = data + "0";
            }
            localStorage.setItem(tsb, data);
        }

        public findNextAvailableDataTSB() {
            for (var x = 1; x <= 3; x++) {
                for (var i = 0; i <= 7; i++) {
                    for (var z = 0; z <= 7; z++) {
                        var tsb = (x.toString()).concat(i.toString()).concat(z.toString());
                        var data = localStorage.getItem(tsb);
                        if (data.substr(0, 1) === "0") {
                            //alert(data.substr(0, 1));

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


               // localStorage.setItem(tsb,"1");
                nextTSB = this.findNextAvailableDataTSB();
                datatwo = "1" + nextTSB + dataone.substr(0, 120);
                localStorage.setItem(tsb, datatwo);
                tsb = nextTSB;
                dataone = dataone.slice(120, dataone.length);

                counter++;
            }
            for (var x = dataone.length; x <= 119; x++) {
                dataone = dataone + "0";
            }
            datatwo = "1" +"0"+"0"+"0"+ dataone;
            localStorage.setItem(tsb, datatwo);
            Control.loadFileSystemTable();

        }
        public findNextAvailableDir(){
                for (var i = 0; i <= 7; i++) {
                    for (var z = 0; z <= 7; z++) {
                        var tsb = "0".concat(i.toString()).concat(z.toString());
                        var data = localStorage.getItem(tsb);
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

                localStorage.setItem(dataTSB,tempString);
                localStorage.setItem(tsb,nameHex);
                Control.loadFileSystemTable();
                return dataTSB;


            }else{
                "File name is too long";
            }
            Control.loadFileSystemTable();


        }
        public readData(tsb){
            var data=localStorage.getItem(tsb);
            var readableData = "";
            var readableString ="";
            var checkForEnd = false;
            while(checkForEnd === false){
                if(data.substr(1,3)=== "000"){
                    checkForEnd = true;
                }
                readableData=readableData+data.substr(4,120);
                data=localStorage.getItem(data.substr(1,3));
            }
            for(var x = 0; x<=readableData.length; x+=2){
               // alert(readableString);
                readableString=readableString+String.fromCharCode(parseInt(readableData.substr(x,2),16));
                if(readableData.substr(x,2)==="00"){
                   // _StdOut.putText(readableString);
                    break;

                }
            }
           // readableData.toString()
            _StdOut.putText(readableString);

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
                    var data = localStorage.getItem(tsb);
                    if (data.substr(4,120) === nameHex) {
                        return data.substr(1,3);
                    }
                }

            }
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
                    var data = localStorage.getItem(tsb);
                    if (data.substr(4,120) === nameHex) {
                        var replacementString = "";
                        while(replacementString.length<124){
                            replacementString= replacementString+"0";

                        }
                        localStorage.setItem(tsb,replacementString);
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
            localStorage.setItem(tsb,replacementString);
        }

    }

}