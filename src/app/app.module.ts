import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UcitavanjeComponent } from './ucitavanje/ucitavanje.component';
import { StorniranjeComponent } from './storniranje/storniranje.component';

@NgModule({
  declarations: [
    AppComponent,
    UcitavanjeComponent,
    StorniranjeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
