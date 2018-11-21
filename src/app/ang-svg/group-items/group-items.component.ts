import { Component, OnInit, Input } from '@angular/core';

import * as SVG from 'svg.js';
import { SVGConfigService } from '../svgconfig.service';
import { Utils } from '../model/Utils';

interface Item {
  id: number;
  desc: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-group-items]',
  templateUrl: './group-items.component.html',
})
export class GroupItemsComponent implements OnInit {

  private svg: SVG.G;
  private circles: SVG.Circle[];

  diameter: number;
  margin: number;

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

  fillColor: string;

  constructor(private svgService: SVGConfigService) { }

  ngOnInit() {
    // const svgElem = document.getElementById('drawing');

    this.svg = SVG.get('main') as SVG.G;

    this.diameter = 50;
    this.margin = 5;
    const lengthLine = this.diameter / 2 + 20;

    this.circles = [];

    for (let i = 0; i < this.items.length; i++) {
      const circle = this.svg.circle(this.diameter)
        .move(
          (this.diameter + this.margin) * i,
          2 * lengthLine - this.diameter / 2)
        .attr('stroke-width', '0');
        this.circles.push(circle);
    }

    const hangPointIn = this.drawLines(lengthLine);
    const hangPointOut = this.drawLines(-lengthLine);

    // this.drawElbowPolyline(hangPointIn, hangPointOut, this.svg);

    this.svg.rect(
        (this.circles.length * this.diameter) + (this.circles.length - 1) * this.margin,
        lengthLine * 4
      )
      .attr('fill', 'none');
  }

  private drawLines(lengthLine) {

    let startY = 0;
    const startXs = [];

    const middleXs = [];
    let middleY = 0;

    let centerX = 0;
    let centerY = 0;

    let endX = 0;
    let endY = 0;

    startY = this.circles[0].y() + this.diameter / 2;
    for (let i = 0; i < this.circles.length; i++) {
      startXs.push(this.circles[i].x() + this.diameter / 2);
    }

    middleY = startY + lengthLine;
    for (let i = 0; i < this.circles.length; i++) {
      middleXs.push(startXs[i]);
    }

    if (this.circles.length % 2 === 0) {
      // rects[0].x() + diameter + margin / 2; (for 2 elements)
      centerX = this.circles[0].x()                                    // start point
                + (this.diameter * (this.circles.length / 2))               // diameter of half of circles
                + this.margin * (Math.floor((this.circles.length - 1) / 2)) // margin between half of circles
                + this.margin / 2;                                   // half of center margin
    } else {
      centerX = this.circles[Math.ceil(this.circles.length / 2)].x()  // x coord of middle elements
                - this.diameter / 2           // remove diameter from coordinate
                - this.margin;                //
    }
    centerY = middleY;

    endX = centerX;
    endY = centerY + lengthLine;

    for (let i = 0; i < this.circles.length; i++) {
      const points = [
        startXs[i], startY,
        middleXs[i], middleY,
        centerX, centerY,
        endX, endY
      ];
      this.svg.polyline(points)
        .attr('fill', 'none')
        .attr('stroke', 'black');
    }

    return {x: endX, y: endY};
  }

  private drawElbowPolyline(start, end, svg) {
    // important to maintaine the start and end point
    const points = Utils.computeElbow(start, end);

    svg.polyline([
      start.x, start.y,
      points[0].x, points[0].y,
      points[1].x, points[1].y,
      end.x, end.y
    ]).attr('fill', 'none')
      .attr('stroke', 'black');
  }

  dragEnd(event) {
    const data = this.svgService.getDragData();
    console.log('Event:', event, 'From service:', data);

    this.fillColor = data;
  }

  getTranslate(): string {
    return 'translate(' + this.originX + ', ' + this.originY + ')';
  }

}
