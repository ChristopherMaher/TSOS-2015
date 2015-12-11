/**
 * Created by Chris on 10/15/15.
 */
///<reference path="../globals.ts" />

module  TSOS {
    export class PCB{

       constructor(public pid:number,
                   public pc:number,
                   public state:string,
                   public acc : number,
                   public x:number,
                   public y:number,
                   public z:number,
                   public base:number,
                   public limit:number,
                   public location:string,
                    public swapTSB:string){
           pid=this.pid;
           pc=this.pc;
           state = this.state;
           acc = this.acc;
           x = this.x;
           y = this.y;
           z = this.z;
           base = this.base;
           limit = this.limit;
           location = this.location;
           swapTSB = this.swapTSB;


       }
        public init(): void {
            this.pc = 0;
            this.state = "New";
            this.acc = 0;
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.location = "Memory";
        }


    }
}