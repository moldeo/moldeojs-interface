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
import { MoErase } from './mo-erase/mo-erase.component';

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
  public configDblClick: () => void;
  public globalKeyDown: () => void;

  constructor(
    private renderer: Renderer2,
    private factory: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ){}

  public ngOnInit(): void {
    this.configDblClick = this.renderer.listen("document", 'dblclick', (e) => {
      if(e.target.className !== "moObject" && e.target.className !== "moHeader" && e.target.className !== "moldeobutton"){
          this.showWheel(e);
      }
    });
  }

  public ngDoCheck(): void{
    if(!this.moWheelDisplay){
      if(this.globalKeyDown){
          this.globalKeyDown(); //Remove the KeyDown Listener
      }
    }
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
    this.context.fillStyle = "#111";
    this.context.fillRect(0, 0, this.cWidth, this.cHeight);
    this.context.fillStyle = "#666";
    for (let x = 0; x < this.cWidth; x+=30) {
      for(let y = 0; y < this.cHeight; y= y+30){
        this.context.fillRect(x, y, 2, 2);
      }
    }
  }

  public autoLayout(): void{
    console.log("Init Automatic LayOut");
    let posY = [];
    let posX = [];
    for(let i=0;i<this.moConfig.nativeElement.children.length;i++){
      posY[i] = parseInt(this.moConfig.nativeElement.children[i].children[0].style.top.replace("px",""));
      posX[i] = parseInt(this.moConfig.nativeElement.children[i].children[0].style.left.replace("px",""));
      if(posY[i] % 60 !== 0){
        posY[i] = Math.round(posY[i] / 60) * 60;
      }
      if(posX[i] % 60 !== 0){
        posX[i] = Math.round(posX[i] / 60) * 60;
      }
      this.moConfig.nativeElement.children[i].children[0].style.top = posY[i]+"px";
      this.moConfig.nativeElement.children[i].children[0].style.left = posX[i]+"px";
    }
    console.log("Automatic LayOut Ended");
  }

  public showWheel(e:any): void {
    this.moWheelDisplay = true;
    this.moWheel.nativeElement.style.left = e.clientX-40+"px";
    this.moWheel.nativeElement.style.top = e.clientY-40+"px";
    ///////////////////////////
    this.globalKeyDown = this.renderer.listen("document", "keydown", (e) => {
      console.log(e.key);
    });
  }

  public newMOObject(c: string): void {
    //Hide moWheel
    this.moWheelDisplay=false;

    //Push moComponent to moConfig
    const container = new HtmlContainer(this.moConfig.nativeElement, this.appRef, this.factory, this.injector);
    let componentRef;
    switch(c) {
       case 'erase':
           componentRef = container.attach(MoErase);
           break;
       default:
           componentRef = container.attach(MoDefaultComponent);
    }
    componentRef.instance.posX = this.moWheel.nativeElement.style.left.replace("px","");
    componentRef.instance.posY = this.moWheel.nativeElement.style.top.replace("px","");
    componentRef.instance.name = "";

    this.containers.push(container);

    //Log to Console
    console.log("moObject type "+componentRef.instance.type+" created sucessful!");
  }

}
