import { Component, OnInit, Input } from '@angular/core';
import { SVGConfigService } from '../svgconfig.service';

import * as SVG from 'svg.js';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-custom-shape]',
  templateUrl: './custom-shape.component.html'
})
export class CustomShapeComponent implements OnInit {

  @Input()
  originX: number;

  @Input()
  originY: number;

  svg: SVG.G;

  width = 30;
  height = 20;
  // points = '0,0 20,0 0,30  20,30';
  lenghtLine = 5;
  points = [
    0, 0,
    20, 0,
    0, 30,
    20, 30
  ];

  constructor(private svgService: SVGConfigService) { }

  ngOnInit() {
    this.svg = SVG.get('custom-shape') as SVG.G;

    this.svg.polygon([
      this.points[0], this.points[1] + this.lenghtLine,
      this.points[2], this.points[3] + this.lenghtLine,
      this.points[4], this.points[5] + this.lenghtLine,
      this.points[6], this.points[7] + this.lenghtLine,
    ]);

    // Draw input output line
    this.svg.polyline([
      (this.points[0] + this.points[2]) / 2, this.points[1],
      (this.points[4] + this.points[6]) / 2, this.points[5] + this.lenghtLine * 2,
    ]).attr('fill', 'none')
      .attr('stroke', 'black');
  }

  getTranslate(): string {
    return 'translate(' + this.originX + ', ' + this.originY + ')';
  }

  dragEnd(e) {
    console.log('drag', this.svgService.getDragData());
  }

}
