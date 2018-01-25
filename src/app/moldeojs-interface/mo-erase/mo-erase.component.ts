import { Component, OnInit, Input, ViewChild, Renderer2 } from '@angular/core';
import { ConnectionsService } from '../services/connections.service';

@Component({
  selector: 'mo-erase',
  templateUrl: './mo-erase.component.html',
  styleUrls: ['./mo-erase.component.css']
})
export class MoErase implements OnInit {
  @Input() public posX:number = 0;
  @Input() public posY:number = 0;
  @Input() public name:string = "";
  @ViewChild('moErase') moErase;
  @ViewChild('moSettings') moSettings;
  @ViewChild('moConnect') moConnect;
  @ViewChild('moPrecon') moPrecon;
  public toggle:boolean = false;
  public drag:boolean = true;

  public type:string = "moErase";
  public title:string = "";

  public globalMouseUp: () => void;
  public globalClick: () => void;

  constructor(public con: ConnectionsService, public renderer: Renderer2) {
    con.renderer = renderer;
  }

  public ngOnInit(): void {
    let this_ = this;
    this.title = this.type + " - " + this.name;

    /*Global Listener*/
    this.globalClick = this.renderer.listen("document", 'click', () => {
      this_.toggle = false;
    });
    this.globalMouseUp = this.renderer.listen("document", 'mouseup', () => {
      this_.drag = true;
    });
  }

  public ngDoCheck(): void{
    if(this.moConnect.nativeElement.children.length > 0){
      if(this.drag){
        this.con.updateCon(this.moErase, this.moConnect);
      }
    }
  }

  public ngAfterViewInit(): void{
    this.moErase.nativeElement.style.left = this.posX+"px";
    this.moErase.nativeElement.style.top = this.posY+"px";
    /********************************************************/
    this.moConnect.nativeElement.style.width = screen.width+"px";
    this.moConnect.nativeElement.style.height = screen.height+"px";
    this.moPrecon.nativeElement.style.width = screen.width+"px";
    this.moPrecon.nativeElement.style.height = screen.height+"px";
  }

  public ngOnDestroy(): void{
    //DESTROY LISTENER WHEN DESTROY Component
    if(this.globalMouseUp){
      this.globalMouseUp();
    }
    if(this.globalClick){
      this.globalClick();
    }
  }
  /*- LYFECYCLE END -*/

  ///////////////////////////////////////////////////////////////////
  /*- moObject Funs -*/
  ///////////////////////////////////////////////////////////////////
  private showSet(): void{
    this.toggle = true;
    this.moSettings.nativeElement.style.left = this.moErase.nativeElement.style.left;
    this.moSettings.nativeElement.style.top = this.moErase.nativeElement.style.top;
  }

}
