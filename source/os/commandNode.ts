/**
 * Created by Chris on 9/19/15.
 */
///<reference path="../globals.ts" />
///<reference path="deviceDriverKeyboard.ts" />


module  TSOS {
    export class CommandNode {

       public root= new Node();


        public  addCommand(command:string){
            var currentNode = this.root;
            var counter = 0; //keeps track of characters in the command string

            while(command.length > counter ){
                var nextNode= new Node();
                if(!currentNode.children.hasOwnProperty(command.charAt(counter))) {
                    currentNode.children[command.charAt(counter)] = nextNode;
                    currentNode = nextNode;
                    counter++;
                }else {
                    currentNode=currentNode.children[command.charAt(counter)];
                    counter++;
                }
            }


        }

        public  findCommand(command:string){
            var currentNode = this.root;
            var counter = 0;

            //travels through already typed letters in command
            while(counter<command.length){
                currentNode=currentNode.children[command.charAt(counter)];
                counter++;
            }

            //finds the remaining letters in command
           while(Object.keys(currentNode.children).length == 1){
                var keys = [];
                keys=Object.keys(currentNode.children);
                currentNode=currentNode.children[keys[0]];

               _KernelInputQueue.enqueue(keys[0]);



           }
        }

    }
    class Node{
        parent:Node;
        children:{[key:string]: Node} ={};

    }
}