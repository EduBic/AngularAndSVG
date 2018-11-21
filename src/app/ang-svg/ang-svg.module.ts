import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RectComponent } from './rect/rect.component';
import { ItemComponent } from './item/item.component';
import { GroupItemsComponent } from './group-items/group-items.component';
import { CustomShapeComponent } from './custom-shape/custom-shape.component';
import { ColorStoreComponent } from './color-store/color-store.component';
import { SvgEditorComponent } from './svg-editor/svg-editor.component';
import { HtmlGroupItemsComponent } from './html-group-items/html-group-items.component';

import { SVGConfigService } from './svgconfig.service';

import { DragAndDropModule } from 'angular-draggable-droppable';


@NgModule({
  declarations: [
    RectComponent,
    ItemComponent,
    GroupItemsComponent,
    CustomShapeComponent,
    ColorStoreComponent,
    SvgEditorComponent,
    HtmlGroupItemsComponent,
  ],
  imports: [
    CommonModule,
    DragAndDropModule
  ],
  exports: [
    SvgEditorComponent
  ],
  providers: [
    SVGConfigService
  ]
})
export class AngSvgModule { }
