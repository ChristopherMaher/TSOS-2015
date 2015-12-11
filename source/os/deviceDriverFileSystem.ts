///<reference path="../host/control.ts" />

module TSOS{
    export class DeviceDriverFileSystem {

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

        public setTSB(tsb, data) {
            var tsb = tsb;
            var data = data;
            var dataone = data
            var datatwo = "";
            var counter = 0;
            var nextTSB = "";
            while (dataone.length >= 120) {


                localStorage.setItem(tsb,"1");
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
    }
}