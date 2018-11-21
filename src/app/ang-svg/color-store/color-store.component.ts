import { Component, OnInit } from '@angular/core';
import { SVGConfigService } from '../svgconfig.service';

@Component({
  selector: 'app-color-store',
  templateUrl: './color-store.component.html',
  styleUrls: ['./color-store.component.css']
})
export class ColorStoreComponent implements OnInit {

  colors: string[] = [
    'blue',
    'lime',
    'black',
    'yellow'
  ];

  constructor(private service: SVGConfigService) { }

  ngOnInit() {
  }

  dragStart(data) {
    this.service.setDragData(data);
  }

}
