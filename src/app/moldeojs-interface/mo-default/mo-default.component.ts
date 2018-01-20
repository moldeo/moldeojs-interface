import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'mo-default',
  templateUrl: './mo-default.component.html',
  styleUrls: ['./mo-default.component.css']
})
export class MoDefaultComponent implements OnInit {
  @Input() public posX:number = 0;
  @Input() public posY:number = 0;
  @Input() public name:string = "";
  @ViewChild('moDefault') moDefault;
  @ViewChild('moSettings') moSettings;
  @ViewChild('moConnect') moConnect;
  @ViewChild('moPrecon') moPrecon;
  public toggle:boolean = false;
  public drag:boolean = true;

  public type:string = "moDefault";
  public title:string = "";

  public pathStraight:number = 10;
  public pathCurve:number = 60;
  public pathDraw:boolean = false;

  public globalMouseMove: () => void;
  public globalMouseUp: () => void;
  public globalClick: () => void;

  constructor(private renderer: Renderer2) {}

  public ngOnInit(): void {
    let this_ = this;
    this.title = this.type + " - " + this.name;

    /*Global Listener*/
    this.globalClick = this.renderer.listen("document", 'click', () => {
      this_.toggle = false;
    });
    this.globalMouseUp = this.renderer.listen("document", 'mouseup', () => {
      this_.drag = true;
      if (this_.globalMouseMove) {
        this_.globalMouseMove();
        if(this_.moPrecon.nativeElement.children[0]){
            this_.moPrecon.nativeElement.children[0].remove();
        }
      }
    });
  }

  public ngDoCheck(): void{
    if(this.moConnect.nativeElement.children.length > 0){
      if(this.drag){
        for(let i = 0; i < this.moConnect.nativeElement.children.length; i++){
          let outlet:any = this.moConnect.nativeElement.children[i].outlet;
          let inlet:any = this.moConnect.nativeElement.children[i].inlet;
          let toX:number = parseInt(outlet.offsetParent.style.left.replace("px","")) + 96;
          let toY:number = parseInt(outlet.offsetParent.style.top.replace("px","")) + 60;
          let fromX:number = parseInt(inlet.offsetParent.style.left.replace("px","")) + inlet.clientWidth/2;
          let fromY:number = parseInt(inlet.offsetParent.style.top.replace("px","")) + inlet.clientHeight/2;

          let curve = this.svgPath(toX, toY, fromX, fromY);
          this.moConnect.nativeElement.children[i].children[0].setAttribute("d", curve);
        }
      }
    }
  }

  public ngAfterViewInit(): void{
    this.moDefault.nativeElement.style.left = this.posX+"px";
    this.moDefault.nativeElement.style.top = this.posY+"px";
    /********************************************************/
    this.moConnect.nativeElement.style.width = screen.width+"px";
    this.moConnect.nativeElement.style.height = screen.height+"px";
    this.moPrecon.nativeElement.style.width = screen.width+"px";
    this.moPrecon.nativeElement.style.height = screen.height+"px";
  }

  public ngOnDestroy(): void{
    //DESTROY LISTENER WHEN DESTROY Component
    this.globalMouseUp();
    this.globalClick();
    this.globalMouseMove();
  }
  /*- LYFE CYCLE END -*/

  ///////////////////////////////////////////////////////////////////
  /*- moObject Funs -*/
  ///////////////////////////////////////////////////////////////////
  private showSet(): void{
    this.toggle = true;
    this.moSettings.nativeElement.style.left = this.moDefault.nativeElement.style.left;
    this.moSettings.nativeElement.style.top = this.moDefault.nativeElement.style.top;
  }

  private dataOut(e:any): void{
    let this_ = this;
    let onInlet:boolean = false;
    let out:any = e.target;
    let x:number = parseInt(this.moDefault.nativeElement.style.left.replace("px","")) + 96;
    let y:number = parseInt(this.moDefault.nativeElement.style.top.replace("px","")) + 60;

    this.moPrecon.nativeElement.innerHTML += '<g><path style="fill:none;stroke-linecap:square;stroke-width:5;" d="" stroke="#12aced"></path></g>';

    let overInlet = this.renderer.listen("document", "mouseup", (e) =>{
      if(onInlet){
        let tx:number = parseInt(e.target.offsetParent.style.left.replace("px","")) + e.target.clientWidth/2;
        let ty:number = parseInt(e.target.offsetParent.style.top.replace("px","")) + e.target.clientHeight/2;
        let curve = this.svgPath(x, y, tx, ty);
        let newG = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.moConnect.nativeElement.appendChild(newG);
        let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this_.moConnect.nativeElement.children[this_.moConnect.nativeElement.children.length - 1].appendChild(newPath);
        this_.moConnect.nativeElement.children[this_.moConnect.nativeElement.children.length - 1].children[0].setAttribute("style", "fill:none;stroke-linecap:square;stroke-width:5;");
        this_.moConnect.nativeElement.children[this_.moConnect.nativeElement.children.length - 1].children[0].setAttribute("stroke", "#12aced");
        this_.moConnect.nativeElement.children[this_.moConnect.nativeElement.children.length - 1].children[0].setAttribute("d", curve);
        this_.moConnect.nativeElement.children[this_.moConnect.nativeElement.children.length - 1].outlet = out;
        this_.moConnect.nativeElement.children[this_.moConnect.nativeElement.children.length - 1].inlet = e.target;
        overInlet();
      }
    });

    this.globalMouseMove = this.renderer.listen("document", 'mousemove', (e) => {
      let curve = this.svgPath(x, y, e.clientX, e.clientY);
      console.log();
      this_.moPrecon.nativeElement.children[this_.moPrecon.nativeElement.children.length - 1].children[0].setAttribute("d", curve);
      if(e.target.className == "moInlet"){
        onInlet = true;
      }else{
        onInlet = false;
      }
    });
  }

  private svgPath(x:number, y:number, tx:number, ty:number): string {
    let fromX = x;
    let fromY = y;
    let toX = tx;
    let toY = ty;

    return "M "+ fromX +" "+ fromY +
      " L "+ (fromX+this.pathStraight) +" "+ fromY +
      " C "+ (fromX+this.pathCurve) +" "+ fromY +" "+ (toX-this.pathCurve) +" "+ toY +" "+ (toX-this.pathStraight) +" "+ toY +
      " L "+ toX +" "+ toY;
  }

  private testObject(): void{
    console.log("MoldeoJS");
    console.log("moObject Type: "+this.type);
    console.log("moObject Name: "+this.name);
  }
}
