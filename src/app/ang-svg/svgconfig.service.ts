import { Injectable } from '@angular/core';

import * as SVG from 'svg.js';

@Injectable({
  providedIn: 'root'
})
export class SVGConfigService {

  mainSvg: SVG.Doc;
  groupItems: any;

  private dragData: any;

  constructor() { }

  public init(ref) {
    this.mainSvg = SVG(ref);
    this.groupItems = SVG.get('group-items');
    console.log('Group Item init:', this.groupItems);
  }

  setDragData(data: any) {
    this.dragData = data;
  }

  getDragData(): any {
    const data = this.dragData;
    this.dragData = undefined;
    return data;
  }


}
