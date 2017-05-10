import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../serv/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm = {
    userPassword: "",
    userName:""
  };
  constructor(private route: Router, private auth: AuthService) { }
  loginSubmit(form){
    let a = this.auth.isLogin(form);
    if(a){
      alert('登录成功')
    }else{
      alert('登录失败')
    }    
    
  }
  ngOnInit() {
  }

}
