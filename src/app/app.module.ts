import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Main Components
import { AppComponent } from './app.component';
import { MoldeojsInterfaceComponent } from './moldeojs-interface/moldeojs-interface.component';
//Moldeo Components
import { MoDefaultComponent } from './moldeojs-interface/mo-objects/mo-default/mo-default.component';
import { MoErase } from './moldeojs-interface/mo-objects/mo-erase.component';
import { MoIcon } from './moldeojs-interface/mo-objects/mo-icon.component';

//Services
import { ConnectionsService } from './moldeojs-interface/services/connections.service';
import { ParamsService } from './moldeojs-interface/services/params.service';
import { MoConfigService } from './moldeojs-interface/services/mo-config.service';
//Directives - Pipes
import { DraggableDirective } from './moldeojs-interface/draggable.directive';

@NgModule({
  declarations: [
    AppComponent,
    MoldeojsInterfaceComponent,
    DraggableDirective,
    MoDefaultComponent,
    MoErase,
    MoIcon,
  ],
  entryComponents: [MoDefaultComponent, MoErase, MoIcon],
  imports: [
    BrowserModule
  ],
  providers: [ConnectionsService, ParamsService, MoConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
