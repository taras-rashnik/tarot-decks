import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ShapePosition } from "../../model/shape-position";
import * as _ from "lodash";

@Component({
  selector: 'app-resizable-frame',
  templateUrl: './resizable-frame.component.html',
  styleUrls: ['./resizable-frame.component.css']
})
export class ResizableFrameComponent implements OnInit {

  @ViewChild('rotate') rotate: ElementRef;
  @ViewChild('resize') resize: ElementRef;
  @ViewChild('content') content: ElementRef;

  @Input() position: ShapePosition = {
    location: {
      left: 10,
      top: 10,
      rotation: 0
    },
    size: {
      width: 50,
      height: 75
    }
  };

  styles: any = {};

  constructor() { }

  updateStyles() {
    this.styles = {
      'left.px': `${this.position.location.left}`,
      'top.px': `${this.position.location.top}`,
      'width.px': `${this.position.size.width}`,
      'height.px': `${this.position.size.height}`,
    };
  }

  ngOnInit() {
    this.updateStyles();

    this.mouseHelper(this.rotate,
      ({ initialPosition, deltaX, deltaY }) => {
        this.position.location.left = initialPosition.location.left + deltaX;
        this.position.location.top = initialPosition.location.top + deltaY;
        this.updateStyles();
      });

    this.mouseHelper(this.resize,
      ({ initialPosition, deltaX, deltaY }) => {
        this.position.size.width = initialPosition.size.width + deltaX;
        this.position.size.height = initialPosition.size.height + deltaY;
        this.updateStyles();
      });

    this.mouseHelper(this.content,
      ({ initialPosition, deltaX, deltaY }) => {
        this.position.location.left = initialPosition.location.left + deltaX;
        this.position.location.top = initialPosition.location.top + deltaY;
        this.updateStyles();
      });
  }

  mouseHelper(element: ElementRef, onMouseMove: any) {
    Observable.fromEvent(element.nativeElement, 'mousedown')
      .flatMap((mdevt: MouseEvent) => {
        mdevt.preventDefault();
        // console.log(mdevt);

        let initialPosition = _.cloneDeep(this.position);
        let startX: number = mdevt.clientX;
        let startY: number = mdevt.clientY;

        return Observable.fromEvent(document, 'mousemove')
          .map((mmevt: MouseEvent) => {
            mmevt.preventDefault();

            let deltaX: number = mmevt.clientX - startX;
            let deltaY: number = mmevt.clientY - startY;
            return {
              initialPosition: initialPosition,
              deltaX: deltaX,
              deltaY: deltaY
            };
          })
          .takeUntil(Observable.fromEvent(document, 'mouseup'));
      })
      .subscribe((delta) => {
        onMouseMove(delta);
      });
  }
}
