import { Point } from './Point';
import { HookPosition } from './HookPosition';

export class HookPoint {
  readonly coord: Point;
  readonly position: HookPosition;

  constructor(coord: Point, pos: HookPosition) {
    this.coord = coord;
    this.position = pos;
  }

  public getOppositePosition(): HookPosition {
    switch (this.position) {
      case HookPosition.Top: {
        return HookPosition.Bottom;
      }
      case HookPosition.Right: {
        return HookPosition.Left;
      }
      case HookPosition.Bottom: {
        return HookPosition.Top;
      }
      case HookPosition.Left: {
        return HookPosition.Right;
      }
    }
  }
}
