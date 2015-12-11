var TSOS;
(function (TSOS) {
    var DeviceDriverFileSystem = (function () {
        function DeviceDriverFileSystem() {
        }
        DeviceDriverFileSystem.prototype.initTSB = function () {
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
        };
        DeviceDriverFileSystem.prototype.initsetTSB = function (tsb, data) {
            var data = data;
            for (var x = data.length; x <= 124; x++) {
                data = data + "0";
            }
            localStorage.setItem(tsb, data);
        };
        DeviceDriverFileSystem.prototype.findNextAvailableDataTSB = function () {
            for (var x = 1; x <= 3; x++) {
                for (var i = 0; i <= 7; i++) {
                    for (var z = 0; z <= 7; z++) {
                        var tsb = (x.toString()).concat(i.toString()).concat(z.toString());
                        var data = localStorage.getItem(tsb);
                        if (data.substr(0, 1) === "0") {
                            //alert(data.substr(0, 1));
                            alert(tsb);
                            return tsb;
                        }
                    }
                }
            }
            return "no more space";
        };
        DeviceDriverFileSystem.prototype.setTSB = function (tsb, data) {
            var data = data;
            var dataone = data;
            var datatwo = "";
            var tempData = "";
            var tempData2 = "";
            var memLimit = 119;
            var memBase = 0;
            var temp = [];
            var counter = 0;
            var nextTSB = "";
            while (dataone.length >= 120) {
                // if(data.length >memLimit){
                //tempData = data.substr(0,119);
                //  tempData2 = data.substr(120,239);
                //}
                localStorage.setItem(tsb, "1");
                nextTSB = this.findNextAvailableDataTSB();
                datatwo = "1" + nextTSB + dataone.substr(0, 119);
                alert(datatwo);
                // temp[counter]=dataone.substr(0, 119);
                localStorage.setItem(tsb, datatwo);
                tsb = nextTSB;
                dataone = dataone.slice(120, dataone.length);
                counter++;
            }
            for (var x = dataone.length; x <= 119; x++) {
                dataone = dataone + "0";
            }
            datatwo = "1" + "0" + "0" + "0" + dataone;
            localStorage.setItem(tsb, datatwo);
            alert("Testtwo");
            alert(datatwo);
            Control.loadFileSystemTable();
        };
        return DeviceDriverFileSystem;
    })();
    TSOS.DeviceDriverFileSystem = DeviceDriverFileSystem;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=deviceDriverFileSystem.js.map