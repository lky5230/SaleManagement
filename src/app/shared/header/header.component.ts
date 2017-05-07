import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isExpored = false;
  constructor() { }
  //展开与收回下拉框
  dropFn(){
    this.isExpored = !this.isExpored
  }
  //下拉框点击
  selectUserInfo(){
    this.isExpored = false;
  }
  ngOnInit() {
  }

}
