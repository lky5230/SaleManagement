import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../serv/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  //用户下拉框列表
  private userList = [{go:'/',info:'设置'},{go:'/logout',info:'注销'},{go:'/',info:'设置'},{go:'/logout',info:'注销'}];
  //用户下拉选择
  aClikc(link){
    console.log(link)
  }
  //是否登录
  isLogin = false;
  constructor(private auth: AuthService) { }
 
  
  ngOnInit() {
      //登录状态
      this.isLogin = this.auth.loginStatus;
  }

}