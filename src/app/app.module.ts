import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
//服务
import { AuthService } from './serv/auth.service';
//shared模块
import { SharedModule } from './shared/shared.module';
//路由
import { routing } from './app.route'
//全局组件
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
    

    SharedModule,
    
    //根路由模块放在最后、、
    RouterModule.forRoot(routing),
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
