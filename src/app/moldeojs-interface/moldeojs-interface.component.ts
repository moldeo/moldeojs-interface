import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
  @ViewChild('moTool') moTool: ElementRef;
  public moToolDisplay:boolean = false;
  /////////////////////////////////////////////
  public moFileName:string = "No File (.MOL)";

  constructor(){}

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    (this.moCanvas.nativeElement as HTMLCanvasElement).width = window.innerWidth;
    (this.moCanvas.nativeElement as HTMLCanvasElement).height = window.innerHeight;
    this.cWidth = (this.moCanvas.nativeElement as HTMLCanvasElement).width;
    this.cHeight = (this.moCanvas.nativeElement as HTMLCanvasElement).height;
    this.context = (this.moCanvas.nativeElement as HTMLCanvasElement).getContext('2d');
    this.draw();
  }

  private draw = () =>{
    this.background();

    requestAnimationFrame(this.draw);
  }

  private background(){
    this.context.fillStyle = "#222";
    this.context.fillRect(0, 0, this.cWidth, this.cHeight);
    this.context.fillStyle = "#666";
    for (let x = 0; x < this.cWidth; x+=30) {
      for(let y = 0; y < this.cHeight; y= y+30){
        this.context.fillRect(x,y,2,2);
      }
    }
  }

  public newMoObject(e){
    this.moToolDisplay = true;
    this.moTool.nativeElement.style.left = e.clientX-100+"px";
    this.moTool.nativeElement.style.top = e.clientY-100+"px";
  }

  public zoom(e){
  }

}
