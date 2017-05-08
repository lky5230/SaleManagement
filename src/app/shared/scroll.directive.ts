import { Directive,OnInit, ElementRef } from '@angular/core';
import * as Ps from 'perfect-scrollbar';

@Directive({
  selector: '[scroll]'
})

export class ScrollDirective {

  constructor(private el: ElementRef) { }
  ngOnInit() {
    Ps.initialize(this.el.nativeElement, {
      wheelSpeed: 1,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
  }
}
