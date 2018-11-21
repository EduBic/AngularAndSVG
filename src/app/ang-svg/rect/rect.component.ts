import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-rect]',
  templateUrl: './rect.component.html',
  styleUrls: ['./rect.component.css']
})
export class RectComponent implements OnInit {

  @Input()
  content: string;

  @Input()
  originX: number;

  @Input()
  originY: number;

  outputX: number;
  outputY: number;

  width = 250;
  height = 50;

  inOuts = [];

  constructor() {

    const topleft = { x: 0, y: 0 };
    const topRight = { x: this.width, y: 0 };
    const bottomRight = { x: this.width, y: this.height };
    const bottomLeft = { x: 0, y: this.height };

  }

  ngOnInit() {
  }

}
