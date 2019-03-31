import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppCommonModule } from './common/app-common.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppCommonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
