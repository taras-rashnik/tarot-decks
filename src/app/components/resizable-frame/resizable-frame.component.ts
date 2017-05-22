import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ShapePosition } from "../../model/shape-position";
import * as _ from "lodash";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

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
      rotation: 10
    },
    size: {
      width: 50,
      height: 75
    }
  };

  styles: any = {};
  safeTransform: SafeStyle;

  constructor(private sanitizer: DomSanitizer) {
    // this.safeTransform = this.sanitizer.bypassSecurityTrustStyle('rotate(45deg)');
  }

  updateStyles() {
    this.styles = {
      'left.px': `${this.position.location.left}`,
      'top.px': `${this.position.location.top}`,
      'width.px': `${this.position.size.width}`,
      'height.px': `${this.position.size.height}`
    };

    this.safeTransform = this.sanitizer.bypassSecurityTrustStyle(`rotate(${this.position.location.rotation}rad)`);
  }

  ngOnInit() {
    this.updateStyles();

    this.mouseHelper(this.rotate,
      ({ initialPosition, deltaX, deltaY }) => {
        let ax = (initialPosition.size.height / 2) * Math.sin(initialPosition.location.rotation);
        let ay = (initialPosition.size.height / 2) * Math.cos(initialPosition.location.rotation);

        let cx = ax + deltaX;
        let cy = ay - deltaY;

        this.position.location.rotation = Math.atan2(cx, cy);

        console.log(`ax: ${ax}, ay: ${ay}, cx: ${cx}, cy: ${cy}, rotation: ${this.position.location.rotation}`);

        this.updateStyles();
      });

    this.mouseHelper(this.resize,
      ({ initialPosition, deltaX, deltaY }) => {
        let ax = (initialPosition.size.width / 2) * Math.cos(initialPosition.location.rotation);
        let ay = (-initialPosition.size.width / 2) * Math.sin(initialPosition.location.rotation);

        let bx = (-initialPosition.size.height / 2) * Math.sin(initialPosition.location.rotation);
        let by = (-initialPosition.size.height / 2) * Math.cos(initialPosition.location.rotation);

        let cx = ax + bx;
        let cy = ay + by;

        let dx = cx + deltaX / 2;
        let dy = cy - deltaY / 2;

        let rate = Math.max(dx / cx, dy / cy);

        this.position.size.width = initialPosition.size.width * rate;
        this.position.size.height = initialPosition.size.height * rate;
        console.log(`ax: ${ax}, ay: ${ay}, bx: ${bx}, by: ${by}, cx: ${cx}, cy: ${cy}, dx: ${dx}, dy: ${dy}, rate: ${rate}, ${this.position.size.width}, ${this.position.size.height}`);

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
