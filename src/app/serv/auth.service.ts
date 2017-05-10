import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private __login = false;
  get isLoging(){
    return this.__login;
  }
  set isLoging(bool: boolean){
    this.__login = bool;
  }
  //获取储存的信息
  public getInfo(){
    let user = localStorage.getItem('user') || '';
    let pas = localStorage.getItem('pas') || '';
    return {user:user,pas:pas}
  }

  constructor() { }
  
  public isLogin(form) {
    //有参数表示验证用户合法性
    if (form) {

      if (form.userName) {
        if (form.userName == this.getInfo().user) {

        } else {
            return false;
        }
      };

      if (form.userPassword) {
        if (form.userPassword == this.getInfo().pas) {

        } else {
            return false;
        }
      }

      this.isLoging = true;
      
      return true;
    }

  }

  public isValid(form){
    this.isLoging = true;
    return true;
  }

}
