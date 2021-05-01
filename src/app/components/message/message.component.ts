import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'message-component',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Message implements OnInit {
  @Input() me: boolean = false;
  @Input() message: string = 'AAA';
  @Input() date: string = 'hellp';
  constructor() {}

  ngOnInit() {}
}
