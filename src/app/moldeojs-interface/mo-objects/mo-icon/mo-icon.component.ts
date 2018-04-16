import { Component, OnInit, Input, Output, ViewChild, Renderer2, ViewContainerRef } from '@angular/core';
import { ConnectionsService } from '../../services/connections.service';
import { ParamsService } from '../../services/params.service';

@Component({
  selector: 'mo-icon',
  templateUrl: './mo-icon.component.html',
  styleUrls: ['./mo-icon.component.css']
})
export class MoIcon implements OnInit {
  @Input() public posX:number = 0;
  @Input() public posY:number = 0;
  @Input() public name:string = "";
  @ViewChild('moIcon') moIcon;
  @ViewChild('moSettings') moSettings;
  @ViewChild('moParams') moParams;
  @ViewChild('moCurrentParams') moCurrentParams;
  @ViewChild('moConnect') moConnect;
  @ViewChild('moPrecon') moPrecon;
  public toggle:boolean = false;
  public drag:boolean = true;

  public type:string = "moIcon";
  public motype:string = "icon";
  public title:string = "";
  /*PARAMS*/
  @Input() public params:any;
  public paramSelect:string = "";
  public showParams:boolean = false;

  public globalMouseUp: () => void;
  public globalClick: () => void;
  public globalKey: () => void;

  constructor(public con: ConnectionsService, public par: ParamsService, public renderer: Renderer2, public viewCon: ViewContainerRef) {
    con.renderer = renderer;
  }

  public ngOnInit(): void {
    let this_ = this;
    this.title = this.type + " - " + this.name;

    if(this.params == undefined){ //DefaultParams
      this.params = [
        this.par.createParam('alpha', [0]),
        this.par.createParam('color', [0, 0, 0, 0]),
        this.par.createParam('syncro', [0]),
        this.par.createParam('phase', [0]),
        this.par.createParam('texture', ["default"]),
        this.par.createParam('blending', [0]),
        this.par.createParam('width', [1.0]),
        this.par.createParam('height', [1.0]),
        this.par.createParam('translatex', [0.0]),
        this.par.createParam('translatey', [0.0]),
        this.par.createParam('rotate', [0.0]),
        this.par.createParam('scalex', [1.0]),
        this.par.createParam('scaley', [1.0])
      ];
    }

    this.moIcon.nativeElement.attributes.type = this.motype; //Send Type

    /*Global Listener*/
    this.globalMouseUp = this.renderer.listen("document", 'mouseup', () => {
      this_.drag = true;
    });
    this.globalClick = this.renderer.listen("document", 'click', (e) => {
      if(e.target.className !== "moParams" && e.target.className !== "moParamsContent"){
        this_.toggle = false;
      }

      if(this.globalKey){
        this.globalKey();
      }
    });
  }

  public ngDoCheck(): void {
    if(this.moConnect && this.moConnect.nativeElement.children.length > 0){
      if(this.drag){
        this.con.updateCon(this.moIcon, this.moConnect);
      }
    }
    this.moIcon.nativeElement.attributes.name = this.name; //Send Name
    this.moIcon.nativeElement.attributes.params = this.params;  //Send Params
  }

  public ngAfterViewInit(): void {
    this.moIcon.nativeElement.style.left = this.posX+"px";
    this.moIcon.nativeElement.style.top = this.posY+"px";
    /********************************************************/
    this.moConnect.nativeElement.style.width = screen.width+"px";
    this.moConnect.nativeElement.style.height = screen.height+"px";
    this.moPrecon.nativeElement.style.width = screen.width+"px";
    this.moPrecon.nativeElement.style.height = screen.height+"px";
  }

  public ngOnDestroy(): void {
    console.log("Destroy moObject");
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
    this.moSettings.nativeElement.style.left = this.moIcon.nativeElement.style.left;
    this.moSettings.nativeElement.style.top = this.moIcon.nativeElement.style.top;

    this.globalKey = this.renderer.listen("document", 'keydown', (e) => {
      if(e.key == "Delete"){
        this.removeMOObject();
      }
    });
  }

  public selParam(param): void {
    let this_ = this;
    this.paramSelect = param;
    this.showParams = false;
    setTimeout(function(){this_.showParams = true;}, 1);
  }

  public getNewParam(e): void{
    if(e.key == "Enter"){
      let this_ = this;
      let indexPar = Array.from(e.target.parentNode.children).indexOf(e.target);
      let currentPar = 0;

      for (let i = 0; i < this.params.length; i++) {
        if(this.params[i][0] === this.paramSelect[0]){
          currentPar = i;
        }
      }

      this_.params[currentPar][1][indexPar] = e.target.value;
      this.showParams = false;
      setTimeout(function(){this_.showParams = true;}, 1);
    }
  }

  public changeName(e): void{
    if(e.key == "Enter"){
      this.name = e.target.value;
    }
  }

  private removeMOObject(): void{
    this.viewCon.element.nativeElement.parentElement.removeChild(this.viewCon.element.nativeElement);
    this.ngOnDestroy();
  }

}
