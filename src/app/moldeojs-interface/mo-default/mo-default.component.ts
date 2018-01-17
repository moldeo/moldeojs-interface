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
  public toggle:boolean = false;
  public drag:boolean = true;

  public type:string = "moDefault";
  public title:string = "";

  constructor(private renderer: Renderer2) {}

  public ngOnInit(): void {
    let this_ = this;
    this.title = this.type + " - " + this.name;
    /*Global Listener*/
    let globalCanvasClick = this.renderer.listen(document.getElementById('moCanvas'), 'click', (e) => {
      this_.toggle = false;
    });
    let globalMouseUp = this.renderer.listen("document", 'mouseup', (e) => {
      this_.drag = true;
    });
  }

  public ngAfterViewInit(): void{
    this.moDefault.nativeElement.style.left = this.posX+"px";
    this.moDefault.nativeElement.style.top = this.posY+"px";
  }

  private showSet(): void{
    this.toggle = true;
    this.moSettings.nativeElement.style.left = this.moDefault.nativeElement.style.left;
    this.moSettings.nativeElement.style.top = this.moDefault.nativeElement.style.top;
  }

  private testObject(): void{
    console.log("MoldeoJS");
    console.log("moObject Type: "+this.type);
    console.log("moObject Name: "+this.name);
  }
}
