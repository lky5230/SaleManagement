import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private loginStating = false;
  //登录状态
  public get loginStatus() {
    return this.isLogin()
  };
  public set loginStatus(b: boolean) {
    this.loginStating = b;
  };
  //认证凭证
  auth = '';

  constructor() { }
  //登录逻辑
  private isLogin() {
    if (
      window.localStorage.getItem('authName')
      &&
      window.localStorage.getItem('authName') == 'lky') {
      this.loginStating = true;
    } else {
      this.loginStating = false;
    }
    return this.loginStating;
  }



}
