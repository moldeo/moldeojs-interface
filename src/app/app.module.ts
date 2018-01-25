import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Main Components
import { AppComponent } from './app.component';
import { MoldeojsInterfaceComponent } from './moldeojs-interface/moldeojs-interface.component';
//Moldeo Components
import { MoDefaultComponent } from './moldeojs-interface/mo-default/mo-default.component';
import { MoErase } from './moldeojs-interface/mo-erase/mo-erase.component';

//Services
import { ConnectionsService } from './moldeojs-interface/services/connections.service';
//Directives - Pipes
import { DraggableDirective } from './moldeojs-interface/draggable.directive';

@NgModule({
  declarations: [
    AppComponent,
    MoldeojsInterfaceComponent,
    DraggableDirective,
    MoDefaultComponent,
    MoErase
  ],
  entryComponents: [MoDefaultComponent, MoErase],
  imports: [
    BrowserModule
  ],
  providers: [ConnectionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
