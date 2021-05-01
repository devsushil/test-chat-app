import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'user-component-sidebar',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class User implements OnInit {
  @Input() active: boolean = false;
  @Input() fullname: string = '';
  @Input() lastMessage: string = '';
  @Input() date: string = '';
  constructor() {}

  ngOnInit() {}
}
