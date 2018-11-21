import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';
import { SVGConfigService } from '../svgconfig.service';
import { Utils } from '../model/Utils';

@Component({
  selector: 'app-svg-editor',
  templateUrl: './svg-editor.component.html',
  styleUrls: ['./svg-editor.component.css']
})
export class SvgEditorComponent implements OnInit {


  selection: HTMLElement = null;

  @ViewChild('group')
  group: ElementRef;
  matrix = [1, 0, 0, 1, 0, 0];

  constructor(private svgService: SVGConfigService) { }

  ngOnInit(): void {
    this.group.nativeElement.setAttribute('transform',
      'matrix(' + this.matrix.join(' ') + ')');

    this.svgService.init('main-svg');

    const center = {
      x: (0 + 600) / 2,
      y: (0 + 600) / 2
    };

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

  selectElem(event: MouseEvent) {
    console.log(event);
    if (this.selection === null) {
      this.selection = event.srcElement.parentElement;
      this.selection.parentElement.classList.add('selected');

    } else if (this.selection === event.srcElement.parentElement) {
      this.selection.parentElement.classList.remove('selected');
      this.selection = null;

    } else {
      this.selection.parentElement.classList.remove('selected');
      this.selection = event.srcElement.parentElement;
      this.selection.parentElement.classList.add('selected');
    }
  }

  private getPosFromAttribute(elem: HTMLElement): number[] {
    if (elem.hasAttribute('transform')) {
      const position = this.selection.getAttribute('transform')
        .replace('translate(', '')
        .replace(')', '')
        .split(', ');

      const newPosition = [];
      position.forEach(item => {
        newPosition.push(parseInt(item, 10));
      });

      return newPosition;
    } else {
      return [0, 0];
    }

  }

  private pan(dx, dy) {
    const vel = 2.5;

    this.matrix[4] += dx * vel;
    this.matrix[5] += dy * vel;

    this.group.nativeElement.setAttribute(
      'transform',
      'matrix(' + this.matrix.join(' ') + ')'
    );
  }

  private zoom(scale) {
    for (let i = 0; i < 4; i++) {
      this.matrix[i] *= scale;
    }

    const svg = document.getElementById('main-svg');
    const centerX = parseFloat(svg.getAttribute('width')) / 2;
    const centerY = parseFloat(svg.getAttribute('height')) / 2;

    this.matrix[4] += (1 - scale) * centerX;
    this.matrix[5] += (1 - scale) * centerY;

    this.group.nativeElement.setAttributeNS(null, 'transform', 'matrix(' + this.matrix.join(' ') + ')');
  }

  @HostListener('document:keydown.Q', ['$event'])
  zoomIn(event: KeyboardEvent) {
    this.zoom(1.10);
  }

  @HostListener('document:keydown.A', ['$event'])
  zoomOut(event: KeyboardEvent) {
    this.zoom(.9);
  }

  @HostListener('document:keydown.K', ['$event'])
  test(event: KeyboardEvent) {
    const x = this.selection.getAttribute('x');
    this.selection.setAttribute('x', (parseFloat(x) + 5).toString());
  }

  @HostListener('document:keydown.ArrowLeft', ['$event'])
  goLeft(event: KeyboardEvent) {
    if (this.selection) {
      const position = this.getPosFromAttribute(this.selection);
      const newX = position[0] - 1;
      const newY = position[1];

      this.selection.setAttribute('transform', 'translate(' + newX + ', ' + newY + ')');
    } else {
      this.pan(1, 0);
    }
  }

  @HostListener('document:keydown.ArrowRight', ['$event'])
  goRight(event: KeyboardEvent) {
    if (this.selection) {
      const position = this.getPosFromAttribute(this.selection);
      const newX = position[0] + 1;
      const newY = position[1];

      this.selection.setAttribute('transform', 'translate(' + newX + ', ' + newY + ')');
    } else {
      this.pan(-1, 0);
    }
  }

  @HostListener('document:keydown.ArrowUp', ['$event'])
  goAhead(event: KeyboardEvent) {
    if (this.selection) {
      const position = this.getPosFromAttribute(this.selection);
      const newX = position[0];
      const newY = position[1] - 1;

      this.selection.setAttribute('transform', 'translate(' + newX + ', ' + newY + ')');
    } else {
      this.pan(0, +1);
    }
  }

  @HostListener('document:keydown.ArrowDown', ['$event'])
  goBack(event: KeyboardEvent) {
    if (this.selection) {
      const position = this.getPosFromAttribute(this.selection);
      const newX = position[0];
      const newY = position[1] + 1;

      this.selection.setAttribute('transform', 'translate(' + newX + ', ' + newY + ')');
    } else {
      this.pan(0, -1);
    }
  }

  dragEnd(event) {
    console.log('Event:', event, 'From service:', this.svgService.getDragData());
  }

}
