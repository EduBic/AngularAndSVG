import { Component, OnInit } from '@angular/core';

interface Item {
  id: number;
  desc: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-item',
  templateUrl: './item.component.html',
})
export class ItemComponent implements OnInit {

  item: Item;

  constructor() {
    this.item = {
      id: 1,
      desc: 'Comp'
    };
  }

  ngOnInit() {
  }

}
