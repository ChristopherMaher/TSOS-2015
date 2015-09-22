///<reference path="../globals.ts" />
/* ------------
     Console.ts

     Requires globals.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell. The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */
var TSOS;
(function (TSOS) {
    var Console = (function () {
        //   public nodeCommand = new CommandNode();
        function Console(currentFont, currentFontSize, currentXPosition, currentYPosition, buffer) {
            if (currentFont === void 0) { currentFont = _DefaultFontFamily; }
            if (currentFontSize === void 0) { currentFontSize = _DefaultFontSize; }
            if (currentXPosition === void 0) { currentXPosition = 0; }
            if (currentYPosition === void 0) { currentYPosition = _DefaultFontSize; }
            if (buffer === void 0) { buffer = ""; }
            this.currentFont = currentFont;
            this.currentFontSize = currentFontSize;
            this.currentXPosition = currentXPosition;
            this.currentYPosition = currentYPosition;
            this.buffer = buffer;
        }
        Console.prototype.init = function () {
            this.clearScreen();
            this.resetXY();
        };
        Console.prototype.clearScreen = function () {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        };
        Console.prototype.resetXY = function () {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        };
        Console.prototype.handleInput = function () {
            // var enterCounter = 0;
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();
                if (chr == String.fromCharCode(9)) {
                    var typedCharacters = this.buffer;
                    rootNode.findCommand(typedCharacters);
                }
                else if (chr === String.fromCharCode(13)) {
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    _TypedArray.push(this.buffer);
                    _TypedCounter = _TypedArray.length;
                    _OsShell.handleInput(this.buffer);
                    // ... and reset our buffer.
                    this.buffer = "";
                }
                else if (chr == String.fromCharCode(38)) {
                    this.buffer = "";
                    _TypedCounter--;
                    _KernelInputQueue.enqueue(_TypedArray[_TypedCounter]);
                    //resets the line display
                    _DrawingContext.fillStyle = "rgb(223, 219, 195)";
                    this.currentXPosition = 0;
                    var yPosition = this.currentYPosition - (_DefaultFontSize +
                        _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                        _FontHeightMargin);
                    _DrawingContext.fillRect(0, yPosition + 5, _Canvas.width, _Canvas.height);
                    _StdOut.putText(">");
                }
                else if (chr == String.fromCharCode(40)) {
                    this.buffer = ""; //reset the buffer
                    _TypedCounter++;
                    _KernelInputQueue.enqueue(_TypedArray[_TypedCounter]);
                    //resets the line display
                    _DrawingContext.fillStyle = "rgb(223, 219, 195)";
                    this.currentXPosition = 0;
                    var yPosition = this.currentYPosition - (_DefaultFontSize +
                        _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                        _FontHeightMargin);
                    _DrawingContext.fillRect(0, yPosition + 5, _Canvas.width, _Canvas.height);
                    _StdOut.putText(">");
                }
                else if (chr == String.fromCharCode(8)) {
                    var last_character = this.buffer.charAt(this.buffer.length - 1);
                    this.backSpace(last_character);
                    this.buffer = this.buffer.substring(0, this.buffer.length - 1);
                }
                else {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.putText(chr);
                    // ... and add it to our buffer.
                    this.buffer += chr;
                }
            }
        };
        Console.prototype.putText = function (text) {
            // My first inclination here was to write two functions: putChar() and putString().
            // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
            // between the two.  So rather than be like PHP and write two (or more) functions that
            // do the same thing, thereby encouraging confusion and decreasing readability, I
            // decided to write one function and use the term "text" to connote string or char.
            //
            // UPDATE: Even though we are now working in TypeScript, char and string remain undistinguished.
            //         Consider fixing that.
            if (text !== "") {
                // Draw the text at the current X and Y coordinates.
                _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, text);
                // Move the current X position.
                var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
                this.currentXPosition = this.currentXPosition + offset;
            }
        };
        Console.prototype.advanceLine = function () {
            this.currentXPosition = 0;
            /*
             * Font size measures from the baseline to the highest point in the font.
             * Font descent measures from the baseline to the lowest point in the font.
             * Font height margin is extra spacing between the lines.
             */
            if (this.currentYPosition >= _Canvas.height - _DefaultFontSize) {
                var scrollDistance = 2 * (_DefaultFontSize +
                    _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                    _FontHeightMargin);
                //duplicates the screen image starting from 1 space down.
                var shellImageData = _DrawingContext.getImageData(0, scrollDistance, _Canvas.width, _Canvas.height - _DefaultFontSize);
                _DrawingContext.fillStyle = "rgb(223, 219, 195)";
                _DrawingContext.fillRect(0, 0, _Canvas.width, _Canvas.height);
                _DrawingContext.fillStyle = 'black'; //set fillstyle back to black for text
                _DrawingContext.putImageData(shellImageData, 0, 0);
                this.currentYPosition = this.currentYPosition - 2 * (_DefaultFontSize +
                    _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                    _FontHeightMargin);
            }
            this.currentYPosition += _DefaultFontSize +
                _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                _FontHeightMargin;
        };
        Console.prototype.backSpace = function (text) {
            if (text !== "") {
                _DrawingContext.fillStyle = "rgb(223, 219, 195)";
                var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
                this.currentXPosition = this.currentXPosition - offset; //Set currentXPosition back a letter
                var yPosition = this.currentYPosition - (_DefaultFontSize +
                    _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                    _FontHeightMargin); //find the approximate size of the text to set y position
                _DrawingContext.fillRect(this.currentXPosition, yPosition + 5, _Canvas.width, _Canvas.height);
            }
        };
        return Console;
    })();
    TSOS.Console = Console;
})(TSOS || (TSOS = {}));
