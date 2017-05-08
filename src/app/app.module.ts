import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

//shared模块
import { SharedModule } from './shared/shared.module';
//路由
import { routing } from './app.route'

import { AppComponent } from './app.component';
import { LeftNavComponent } from './left-nav/left-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    RouterModule.forRoot(routing),

    SharedModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
