import { BrowserModule } from '@angular/platform-browser';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  Type
} from '@angular/core';
import { HtmlContainer } from './htmlcontainer';
import { MoDefaultComponent } from './mo-default/mo-default.component';

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
  containers: HtmlContainer[] = [];
  /////////////////////////////////////////////
  public moFileName:string = "No File (.MOL)";
  /////////////////////////////////////////////
  //- Listeners -//
  public wheelClick: () => void;
  public configDblClick: () => void;
  public svgDblClick: () => void;

  constructor(
    private renderer: Renderer2,
    private factory: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ){}

  public ngOnInit(): void {
    this.configDblClick = this.renderer.listen("document", 'dblclick', (e) => {
      if(e.target.className !== "moObject"){
          this.showWheel(e);
      }
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

  public showWheel(e:any): void {
    this.moWheelDisplay = true;
    this.moWheel.nativeElement.style.left = e.clientX-100+"px";
    this.moWheel.nativeElement.style.top = e.clientY-100+"px";
  }

  public newMOObject(e:any, c: number): void {
    //Hide moWheel
    this.moWheelDisplay=false;

    //Push moComponent to moConfig
    const container = new HtmlContainer(this.moConfig.nativeElement, this.appRef, this.factory, this.injector);
    let componentRef;
    switch(c) {
       case 0:
           componentRef = container.attach(MoDefaultComponent);
           break;
       case 1:

           break;
       default:
           componentRef = container.attach(MoDefaultComponent);
    }
    componentRef.instance.posX = e.clientX;
    componentRef.instance.posY = e.clientY;
    componentRef.instance.name = "Obj1";

    this.containers.push(container);

    //Log to Console
    console.log("moObject type "+componentRef.instance.type+" created sucessful!");
  }

}
