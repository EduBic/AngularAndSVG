import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngSvgModule } from './ang-svg/ang-svg.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngSvgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
