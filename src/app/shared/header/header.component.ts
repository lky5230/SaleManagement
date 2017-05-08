import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  //用户下拉框列表
  private userList = [{go:'/',info:'设置'},{go:'/logout',info:'注销'}];
  
  constructor() { }
 
  
  ngOnInit() {
  }

}
