import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Router } from "@angular/router"
@Component({
  selector: 'drop-down-btn',
  templateUrl: './drop-down-btn.component.html',
  styleUrls: ['./drop-down-btn.component.css']
})
export class DropDownBtnComponent implements OnInit {
  //是否展开下拉列表
  private isExpored = false;
  //下拉列表数组
  @Input() list = [];

  constructor(private router: Router) { }
  //展开与收回下拉框
  dropFn() {
    this.isExpored = !this.isExpored
  }
  //点击document关闭下拉列表
  @HostListener('window:click') windowClick() {
    this.isExpored = false;
  }
  //下拉列表点击跳转
  goTo(link){
    this.router.navigate([link]);
  }
  ngOnInit() {
  }

}
