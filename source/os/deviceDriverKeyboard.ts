///<reference path="../globals.ts" />
///<reference path="deviceDriver.ts" />

/* ----------------------------------
   DeviceDriverKeyboard.ts

   Requires deviceDriver.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */

module TSOS {

    // Extends DeviceDriver
    export class DeviceDriverKeyboard extends DeviceDriver {

        constructor() {
            // Override the base method pointers.
            super(this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
        }

        public krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }

        public krnKbdDispatchKeyPress(params) {
            // Parse the params.    TODO: Check that the params are valid and osTrapError if not.
            var keyCode = params[0];
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";

            // Check to see if we even want to deal with the key that was pressed.
            if (((keyCode >= 65) && (keyCode <= 90)) ||   // A..Z
                ((keyCode >= 97) && (keyCode <= 123))) {  // a..z {
                // Determine the character we want to display.
                // Assume it's lowercase...
                chr = String.fromCharCode(keyCode + 32);
                // ... then check the shift key and re-adjust if necessary.
                if (isShifted) {
                    chr = String.fromCharCode(keyCode);

                }
                // TODO: Check for caps-lock and handle as shifted if so.
                _KernelInputQueue.enqueue(chr);
            } else if (((keyCode >= 48) && (keyCode <= 57)) ||   // digits
                (keyCode == 32) ||   // space
                (keyCode == 13)) {                       // enter

                chr = String.fromCharCode(keyCode);

                if(isShifted){

                    if(keyCode == 48){
                        chr = String.fromCharCode(41);
                    }
                    if(keyCode == 49){
                        chr = String.fromCharCode(33);
                    }
                    if(keyCode == 50){
                        chr = String.fromCharCode(64);
                    }
                    if((keyCode >= 51) && (keyCode <= 53)){
                        chr = String.fromCharCode(keyCode-16);
                    }
                    if(keyCode == 54){
                        chr = String.fromCharCode(94);
                    }
                    if(keyCode == 55) {
                        chr = String.fromCharCode(38);
                    }
                    if(keyCode == 56) {
                        chr = String.fromCharCode(42);
                    }

                    if(keyCode == 57) {
                        chr = String.fromCharCode(40);
                    }

                }
                _KernelInputQueue.enqueue(chr);
            } else if (keyCode == 9){
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }else if ((keyCode >= 44+144) && (keyCode <= 47+144)){  //symbols and punctuation
                chr = String.fromCharCode(keyCode-144);

                if(isShifted){
                    if(keyCode-144==47) {
                        chr = String.fromCharCode(63);

                    }
                    if(keyCode-144==46) {
                        chr = String.fromCharCode(62);

                    }
                    if(keyCode-144==44) {
                        chr = String.fromCharCode(60);

                    }
                    if(keyCode-144==45) {
                        chr = String.fromCharCode(95);

                    }

              }
                _KernelInputQueue.enqueue(chr);


            }else if(keyCode == 61+126){
                chr = String.fromCharCode(keyCode-126);

                if(isShifted){
                    chr = String.fromCharCode(43);

                }
                _KernelInputQueue.enqueue(chr);

            }else if ((keyCode >= 91+128) && (keyCode <= 93+128)){
                chr = String.fromCharCode(keyCode-128);

                if(isShifted){
                    chr = String.fromCharCode(keyCode-96);

                }

                _KernelInputQueue.enqueue(chr);

            }else if (keyCode==186){
                chr = String.fromCharCode(59);

                if(isShifted){
                    chr = String.fromCharCode(58);

                }

                _KernelInputQueue.enqueue(chr);

            }else if (keyCode==222){
                chr = String.fromCharCode(39);

                if(isShifted){
                    chr = String.fromCharCode(34);

                }

                _KernelInputQueue.enqueue(chr);

            }else if (keyCode==192){
                chr = String.fromCharCode(96);

                if(isShifted){
                    chr = String.fromCharCode(126);

                }

                _KernelInputQueue.enqueue(chr);

            }else if((keyCode == 38)||(keyCode == 40) || //up and down arrow keys
                      (keyCode == 8)){      //backspace
                chr = String.fromCharCode(keyCode);
               _KernelInputQueue.enqueue(chr);

            }


        }
    }
}
