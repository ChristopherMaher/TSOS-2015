///<reference path="../host/control.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TSOS;
(function (TSOS) {
    var DeviceDriverFileSystem = (function (_super) {
        __extends(DeviceDriverFileSystem, _super);
        function DeviceDriverFileSystem() {
            // Override the base method pointers.
            _super.call(this, this.krnHdDriverEntry, this.krnHdISR);
        }
        DeviceDriverFileSystem.prototype.krnHdDriverEntry = function () {
            // Initialization routine for this, the kernel-mode HD driver.
            this.status = "loaded";
            // More?
        };
        DeviceDriverFileSystem.prototype.krnHdISR = function (params) {
            var create = 1;
            var read = 2;
            var write = 3;
            var remove = 4;
            var format = 5;
            if (params[0] === create) {
                this.setDirFile(params[1]);
            }
            else if (params[0] === read) {
            }
            else if (params[0] === write) {
                this.setTSB(params);
            }
            else if (params[0] === remove) {
            }
            else if (params[0] === format) {
            }
        };
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
            localStorage.setItem("000", "100011000000");
            TSOS.Control.createFileSystemTable();
            TSOS.Control.loadFileSystemTable();
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
                            return tsb;
                        }
                    }
                }
            }
            return "no more space";
        };
        DeviceDriverFileSystem.prototype.setTSB = function (params) {
            var tsb = params[1];
            var data = params[2];
            var dataone = data;
            var datatwo = "";
            var counter = 0;
            var nextTSB = "";
            while (dataone.length >= 120) {
                localStorage.setItem(tsb, "1");
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
            datatwo = "1" + "0" + "0" + "0" + dataone;
            localStorage.setItem(tsb, datatwo);
            TSOS.Control.loadFileSystemTable();
        };
        DeviceDriverFileSystem.prototype.findNextAvailableDir = function () {
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
        };
        DeviceDriverFileSystem.prototype.setDirFile = function (fileName) {
            var fileName = fileName.toString();
            var nameHex = "";
            var counter = 0;
            //  alert(fileName.charCodeAt(0));
            while (counter < fileName.length) {
                nameHex = nameHex + (fileName.charCodeAt(counter)).toString(16);
                alert(nameHex);
                counter++;
            }
            if (nameHex.length < 120) {
                while (nameHex.length < 120) {
                    nameHex = nameHex + "0";
                }
                var tsb = this.findNextAvailableDir();
                var dataTSB = this.findNextAvailableDataTSB();
                nameHex = dataTSB + nameHex;
                var tempString = "1";
                while (tempString.length < 123) {
                    tempString = tempString + "0";
                }
                localStorage.setItem(dataTSB, tempString);
                localStorage.setItem(tsb, nameHex);
            }
            else {
                "File name is too long";
            }
            TSOS.Control.loadFileSystemTable();
        };
        return DeviceDriverFileSystem;
    })(TSOS.DeviceDriver);
    TSOS.DeviceDriverFileSystem = DeviceDriverFileSystem;
})(TSOS || (TSOS = {}));
