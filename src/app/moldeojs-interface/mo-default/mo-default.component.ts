import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';

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
  public toggle:boolean = false;
  public drag:boolean = true;

  public type:string = "moDefault";
  public title:string = "";

  public pathStraight:number = 10;
  public pathCurve:number = 60;

  public globalMouseMove: () => void;

  constructor(private renderer: Renderer2) {}

  public ngOnInit(): void {
    let this_ = this;
    this.title = this.type + " - " + this.name;

    /*Global Listener*/
    let globalClick = this.renderer.listen("document", 'click', () => {
      this_.toggle = false;
    });
    let globalMouseUp = this.renderer.listen("document", 'mouseup', () => {
      this_.drag = true;
      if (this_.globalMouseMove) {
        this_.globalMouseMove();
        if(this_.moConnect.nativeElement.children[this_.moConnect.nativeElement.children.length - 1]){
            this_.moConnect.nativeElement.children[this_.moConnect.nativeElement.children.length - 1].remove();
        }
      }
    });
  }

  public ngAfterViewInit(): void{
    this.moDefault.nativeElement.style.left = this.posX+"px";
    this.moDefault.nativeElement.style.top = this.posY+"px";
    /********************************************************/
    this.moConnect.nativeElement.style.width = screen.width+"px";
    this.moConnect.nativeElement.style.height = screen.height+"px";

  }

  private showSet(): void{
    this.toggle = true;
    this.moSettings.nativeElement.style.left = this.moDefault.nativeElement.style.left;
    this.moSettings.nativeElement.style.top = this.moDefault.nativeElement.style.top;
  }

  private dataOut(e): void{
    let this_ = this;
    let x = parseInt(this.moDefault.nativeElement.style.left.replace("px","")) + 96;
    let y = parseInt(this.moDefault.nativeElement.style.top.replace("px","")) + 60;

    this.moConnect.nativeElement.innerHTML +='<g><path style="fill:none;stroke-linecap:square;stroke-width:5;" d="" stroke="#12aced"></path></g>';

    this.globalMouseMove = this.renderer.listen("document", 'mousemove', (e) => {
      let curve = this.svgPath(x, y, e);
      this_.moConnect.nativeElement.children[this_.moConnect.nativeElement.children.length - 1].children[0].setAttribute("d", curve);
    });
  }

  private svgPath(x:number, y:number, e:any): string {
    let fromX = x;
    let fromY = y;
    let toX = (e.clientX);
    let toY = (e.clientY);

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
