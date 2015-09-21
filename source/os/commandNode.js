/**
 * Created by Chris on 9/19/15.
 */
///<reference path="userCommand.ts" />
var TSOS;
(function (TSOS) {
    var CommandNode = (function () {
        function CommandNode() {
            //root:Node;
            this.root = new Node();
        }
        CommandNode.prototype.addCommand = function (command) {
            var currentNode = this.root;
            //var commandLetter=command.charAt(0);
            var counter = 0;
            while (command.length > counter) {
                var nextNode = new Node();
                currentNode.children[command.charAt(counter)] = nextNode;
                _StdOut.putText();
                currentNode = nextNode;
                counter++;
            }
            document.getElementById("taGraphicTaskBar").value = JSON.stringify(Object.keys(this.root.children));
        };
        CommandNode.prototype.findCommand = function (command) {
            var currentNode = this.root;
            var counter = 0;
            document.getElementById("taGraphicTaskBar").value = JSON.stringify(Object.keys(currentNode.children));
            while (counter < command.length) {
                currentNode = currentNode.children[command.charAt(counter)];
                counter++;
            }
            // var child=currentNode.children;
            var counter2 = 0;
            var keys = [];
            while (Object.keys(currentNode.children).length == 1) {
                //while(Object.keys(currentNode.children).length == 1){
                keys = Object.keys(currentNode.children);
                currentNode = currentNode.children[keys[counter2]];
                counter2++;
                document.getElementById("taGraphicTaskBar").value = keys[counter2];
            }
        };
        return CommandNode;
    })();
    TSOS.CommandNode = CommandNode;
    var Node = (function () {
        function Node() {
            this.children = {};
        }
        return Node;
    })();
})(TSOS || (TSOS = {}));
//# sourceMappingURL=commandNode.js.map