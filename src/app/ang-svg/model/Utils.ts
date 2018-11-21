import * as SVG from 'svg.js';
import { Point } from './Point';
import { InOutPair } from './InOutPair';
import { HookPosition } from './HookPosition';

export class Utils {

  public static EXAMPLE_END_POINTS = [
    { x: 300 + 200, y: 300 + 50 },
    { x: 300 + 200, y: 300 - 50 },
    { x: 300 - 200, y: 300 + 50 },
    { x: 300 - 200, y: 300 - 50 },
    { x: 300 + 50, y: 300 + 200 },
    { x: 300 + 50, y: 300 - 200 },
    { x: 300 - 50, y: 300 + 200 },
    { x: 300 - 50, y: 300 - 200 },
  ];

  public static computeElbow(startPoint: Point, endPoint: Point): Point[] {
    const log = console.log;

    // horizontal case
    if (Math.abs(startPoint.x - endPoint.x) >= Math.abs(startPoint.y - endPoint.y)) {
      log('Horizontal');

      const m1y = startPoint.y;
      const m2y = endPoint.y;
      const mx = Math.min(startPoint.x, endPoint.x) + Math.abs(startPoint.x - endPoint.x) / 2;

      return [
        new Point(mx, m1y),
        new Point(mx, m2y)
      ];
    }

    // vertical case
    if (Math.abs(startPoint.x - endPoint.x) < Math.abs(startPoint.y - endPoint.y)) {

      const m1x = startPoint.x;
      const m2x = endPoint.x;
      const my = Math.min(startPoint.y, endPoint.y) + Math.abs(startPoint.y - endPoint.y) / 2;

      return [
        new Point(m1x, my),
        new Point(m2x, my)
      ];
    }
  }

  public static drawDirectPolyline(start: Point, end: Point, svg: SVG.G) {
    let middle: Point;

    if (start.y < end.y && start.x >= end.x) {
      // middle point is left top
      middle = new Point(Math.min(start.x, end.x), Math.min(start.y, end.y));
    } else if (start.y < end.y && start.x < end.x) {
      // middle point is left bottom
      middle = new Point(Math.min(start.x, end.x), Math.max(start.y, end.y));
    } else if (start.y >= end.y && start.x >= end.x) {
      // middle point is right top
      middle = new Point(Math.max(start.x, end.x), Math.min(start.y, end.y));
    } else if (start.y >= end.y && start.x < end.x) {
      // middle point is right bottom
      middle = new Point(Math.max(start.x, end.x), Math.max(start.y, end.y));
    }

    svg.polyline([
      start.x, start.y,
      middle.x, middle.y,
      end.x, end.y
    ]).attr('fill', 'none')
    .attr('stroke', 'blue');
  }

  public static drawSingleElbowPolyline(_out: InOutPair, _in: InOutPair, svg: SVG.G) {
    // N.B. the flow is: out -> in
    const log = console.log;
    const inPoint = _in.getInCoordinate();
    const inPos = _in.getInPosition();
    const outPoint = _out.getOutCoordinate();
    const outPos = _out.getOutPosition();

    log('drawSingleElbow', outPos, '->', inPos);

    if (inPoint.x < outPoint.x && inPoint.y < outPoint.y) {
      // output right bottom
      log('Output bottom right', inPos, outPos);
      if (inPos === HookPosition.Bottom && outPos === HookPosition.Left) { // L shape
        const middle = new Point(Math.min(inPoint.x, outPoint.x), Math.max(inPoint.y, outPoint.y));

        svg.polyline([
          outPoint.x, outPoint.y,
          middle.x, middle.y,
          inPoint.x, inPoint.y
        ]).attr('fill', 'none')
          .attr('stroke', 'orange');

      } else if (inPos === HookPosition.Bottom && outPos === HookPosition.Top) {
        Utils.drawElbowPolyline(inPoint, outPoint, svg);
      }

    } else if (inPoint.x > outPoint.x && inPoint.y < outPoint.y) {
      // output left bottom
      log('output bottom left');
      if (inPos === HookPosition.Bottom && outPos === HookPosition.Right) {

        const middle = new Point(Math.max(inPoint.x, outPoint.x), Math.max(inPoint.y, outPoint.y));

        svg.polyline([
          outPoint.x, outPoint.y,
          middle.x, middle.y,
          inPoint.x, inPoint.y
        ]).attr('fill', 'none')
          .attr('stroke', 'orange');

      } else if (outPos === HookPosition.Top && inPos === HookPosition.Bottom) {
        Utils.drawElbowPolyline(inPoint, outPoint, svg);
      }


    } else if (inPoint.x > outPoint.x && inPoint.y > outPoint.y) {
      // output left top
      log('output top left');
      if (outPos === HookPosition.Bottom && inPos === HookPosition.Left) {
        const middle = new Point(Math.min(inPoint.x, outPoint.x), Math.max(inPoint.y, outPoint.y));

        svg.polyline([
          outPoint.x, outPoint.y,
          middle.x, middle.y,
          inPoint.x, inPoint.y
        ]).attr('fill', 'none')
          .attr('stroke', 'orange');

      }

    } else if (inPoint.x < outPoint.x && inPoint.y > outPoint.y) {
      // output right top
      log('output top right');
      if (inPos === HookPosition.Left && outPos === HookPosition.Top) {
        const middle = new Point(Math.min(inPoint.x, outPoint.x), Math.max(inPoint.y, outPoint.y));

        svg.polyline([
          outPoint.x, outPoint.y,
          middle.x, middle.y,
          inPoint.x, inPoint.y
        ]).attr('fill', 'none')
          .attr('stroke', 'orange');

      }
    }
  }


  public static drawElbowPolyline(start: Point, end: Point, svg: SVG.G) {
    // important to maintaine the start and end point
    const points = Utils.computeElbow(start, end);

    svg.polyline([
      start.x, start.y,
      points[0].x, points[0].y,
      points[1].x, points[1].y,
      end.x, end.y
    ]).attr('fill', 'none')
      .attr('stroke', 'blue');
  }
}
