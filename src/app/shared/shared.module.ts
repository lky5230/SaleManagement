import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HeaderComponent } from './header/header.component';
import { DropDownBtnComponent } from './drop-down-btn/drop-down-btn.component';
import { ScrollDirective } from './scroll.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports:[
    HeaderComponent,
    DropDownBtnComponent,
    ScrollDirective
  ],
  declarations: [
    HeaderComponent,
    DropDownBtnComponent,
    ScrollDirective
  ]
})
export class SharedModule { }
