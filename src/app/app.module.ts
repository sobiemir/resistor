import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { MainComponent } from './partials/main/main.component';
import { ToolboxFactory } from './toolbox/toolbox.factory';
import { ToolboxComponent } from './partials/toolbox/toolbox.component';
import { DiagramComponent } from './pages/diagram/diagram.component';
import { DiagramService } from './pages/diagram/diagram.service';
import { ToolboxService } from './toolbox/toolbox.service';

@NgModule({
  declarations: [
    MainComponent,
    ToolboxComponent,
    DiagramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DiagramService,
    ToolboxFactory,
    ToolboxService
  ],
  bootstrap: [
    MainComponent
  ]
})
export class AppModule { }
