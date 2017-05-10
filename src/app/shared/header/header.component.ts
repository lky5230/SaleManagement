import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../serv/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //用户下拉框列表
  private userList = [{ go: '/setting', info: '设置' }, { go: () => { this.auth.isLoging = false }, info: '注销' }];
  //用户下拉选择
  aClikc(link) {
    if (typeof link.go == 'function') {
      link.go();
    } else {
      this.router.navigate([link])
    }
  }
  //是否登录
  get isLogin() {
    return this.auth.isLoging;
  };
  constructor(private auth: AuthService, private router: Router) { }
  pageTo(link) {
    this.router.navigate([link])
  }

  ngOnInit() {

  }

}
