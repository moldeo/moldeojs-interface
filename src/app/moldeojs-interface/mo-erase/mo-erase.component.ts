import { Component, OnInit, Input, ViewChild, Renderer2, ViewContainerRef } from '@angular/core';
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
  public globalKey: () => void;

  constructor(public con: ConnectionsService, public renderer: Renderer2, public viewCon: ViewContainerRef) {
    con.renderer = renderer;
  }

  public ngOnInit(): void {
    let this_ = this;
    this.title = this.type + " - " + this.name;

    /*Global Listener*/
    this.globalMouseUp = this.renderer.listen("document", 'mouseup', () => {
      this_.drag = true;
    });
    this.globalClick = this.renderer.listen("document", 'click', () => {
      this_.toggle = false;
      if(this.globalKey){
        this.globalKey();
      }
    });
  }

  public ngDoCheck(): void {
    if(this.moConnect && this.moConnect.nativeElement.children.length > 0){
      if(this.drag){
        this.con.updateCon(this.moErase, this.moConnect);
      }
    }
  }

  public ngAfterViewInit(): void {
    this.moErase.nativeElement.style.left = this.posX+"px";
    this.moErase.nativeElement.style.top = this.posY+"px";
    /********************************************************/
    this.moConnect.nativeElement.style.width = screen.width+"px";
    this.moConnect.nativeElement.style.height = screen.height+"px";
    this.moPrecon.nativeElement.style.width = screen.width+"px";
    this.moPrecon.nativeElement.style.height = screen.height+"px";
  }

  public ngOnDestroy(): void {
    //NULL Vars
    this.posX = null;
    this.posY = null;
    this.name = null;
    this.moErase = null;
    this.moSettings = null;
    this.moConnect = null;
    this.moPrecon = null;
    this.toggle = null;
    this.drag = null;
    this.type = null;
    this.title = null;
    this.con = null;
    this.renderer = null;
    this.viewCon = null;
    //DESTROY LISTENER WHEN DESTROY Component
    if(this.globalMouseUp){
      this.globalMouseUp();
    }
    if(this.globalClick){
      this.globalClick();
    }
    if(this.globalKey){
      this.globalKey();
    }
  }
  /*- LYFECYCLE END -*/

  ///////////////////////////////////////////////////////////////////
  /*- moObject Funs -*/
  ///////////////////////////////////////////////////////////////////
  private showSet(): void {
    this.toggle = true;
    this.moSettings.nativeElement.style.left = this.moErase.nativeElement.style.left;
    this.moSettings.nativeElement.style.top = this.moErase.nativeElement.style.top;

    this.globalKey = this.renderer.listen("document", 'keydown', (e) => {
      if(e.key == "Delete"){
        this.removeMOObject();
      }
    });
  }

  private removeMOObject(): void{
    this.viewCon.element.nativeElement.parentElement.removeChild(this.viewCon.element.nativeElement);
    this.ngOnDestroy();
  }

}
