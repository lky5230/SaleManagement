import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HeaderComponent } from './header/header.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports:[
    HeaderComponent
  ],
  declarations: [
    HeaderComponent
  ]
})
export class SharedModule { }
