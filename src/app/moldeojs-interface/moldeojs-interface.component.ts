import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'moldeojs-interface',
  templateUrl: './moldeojs-interface.component.html',
  styleUrls: ['./moldeojs-interface.component.css']
})
export class MoldeojsInterfaceComponent implements OnInit {
  //Template for Canvas Reference
  @ViewChild('moCanvas') moCanvas: ElementRef;
  //Render Context for Canvas
  public context: CanvasRenderingContext2D;
  //Vars control Canvas
  public cWidth:number;
  public cHeight:number;
  /////////////////////////////////////////////
  public title = 'MoldeoJS Interface';
  public xml:any;
  /////////////////////////////////////////////
  /*- moWheel definitions -*/
  @ViewChild('moWheel') moWheel: ElementRef;
  public moWheelDisplay:boolean = false;
  /////////////////////////////////////////////
  /*- moConfig definitions, for save Components -*/
  @ViewChild('moConfig') moConfig: ElementRef;
  /////////////////////////////////////////////
  public moFileName:string = "No File (.MOL)";

  constructor(private renderer: Renderer2){}

  public ngOnInit(): void {
    let svgDblClick = this.renderer.listen(document.getElementsByTagName("svg")[document.getElementsByTagName("svg").length - 1], 'dblclick', (e) => {
      this.newMoObject(e);
    });
  }

  public ngAfterViewInit(): void {
    (this.moCanvas.nativeElement as HTMLCanvasElement).width = window.innerWidth;
    (this.moCanvas.nativeElement as HTMLCanvasElement).height = window.innerHeight;
    this.cWidth = (this.moCanvas.nativeElement as HTMLCanvasElement).width;
    this.cHeight = (this.moCanvas.nativeElement as HTMLCanvasElement).height;
    this.context = (this.moCanvas.nativeElement as HTMLCanvasElement).getContext('2d');
    this.draw();
  }

  private draw(): void {
    this.context.fillStyle = "#222";
    this.context.fillRect(0, 0, this.cWidth, this.cHeight);
    this.context.fillStyle = "#666";
    for (let x = 0; x < this.cWidth; x+=30) {
      for(let y = 0; y < this.cHeight; y= y+30){
        this.context.fillRect(x, y, 2, 2);
      }
    }
  }

  public newMoObject(e:any): void {
    this.moWheelDisplay = true;
    this.moWheel.nativeElement.style.left = e.clientX-100+"px";
    this.moWheel.nativeElement.style.top = e.clientY-100+"px";
  }

}
