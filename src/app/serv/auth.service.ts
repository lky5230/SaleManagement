import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  //登录状态
  loginStatus = false;
  //认证凭证
  auth = '';

  constructor() { }
  //登录逻辑
  isLogin() {
    if (
      window.localStorage.getItem('authName')
      &&
      window.localStorage.getItem('authName') == 'lky') {
      this.loginStatus = true
    } else {
      this.loginStatus = false;
    }
  }










  
}
