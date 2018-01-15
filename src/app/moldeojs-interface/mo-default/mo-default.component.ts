import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

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

  public type:string = "moDefault";
  public title:string = "";

  constructor() {}

  ngOnInit() {
    this.title = this.type + " - " + this.name;
  }

  ngAfterViewInit(){
    this.moDefault.nativeElement.style.left = this.posX+"px";
    this.moDefault.nativeElement.style.top = this.posY+"px";
  }

  showSet(){
    this.toggle = true;
    this.moSettings.nativeElement.style.left = this.moDefault.nativeElement.style.left;
    this.moSettings.nativeElement.style.top = this.moDefault.nativeElement.style.top;
  }

  testObject(){
    console.log("MoldeoJS");
    console.log("moObject Type: "+this.type);
    console.log("moObject Name: "+this.name);
  }

}
