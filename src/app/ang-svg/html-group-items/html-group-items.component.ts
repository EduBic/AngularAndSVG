import { Component, OnInit, Input } from '@angular/core';

interface Item {
  id: number;
  desc: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-html-group-items]',
  templateUrl: './html-group-items.component.html',
})
export class HtmlGroupItemsComponent implements OnInit {

  diameter: number;
  margin: number;
  lengthLine: number;

  @Input()
  originX: number;
  @Input()
  originY: number;

  @Input()
  outputX: number;
  @Input()
  outputY: number;

  items: Item[] = [
    { id: 1, desc: 'Item 1' },
    { id: 2, desc: 'Item 2' },
    { id: 3, desc: 'Item 2' },
  ];

  constructor() { }

  ngOnInit() {
    this.diameter = 50;
    this.margin = 5;
    this.lengthLine = this.diameter / 2 + 20;
  }

  getCx(index: number) {
    return this.originX + (this.diameter + this.margin) * index;
  }

  getCy(index: number) {
    return this.originY + 2 * this.lengthLine - this.diameter / 2;
  }

}
