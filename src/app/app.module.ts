import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MoldeojsInterfaceComponent } from './moldeojs-interface/moldeojs-interface.component';
import { MoDefaultComponent } from './moldeojs-interface/mo-default/mo-default.component';
import { DraggableDirective } from './moldeojs-interface/draggable.directive';


@NgModule({
  declarations: [
    AppComponent,
    MoldeojsInterfaceComponent,
    MoDefaultComponent,
    DraggableDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
