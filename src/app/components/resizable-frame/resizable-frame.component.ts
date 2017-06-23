import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ShapePosition } from "../../model/shape-position";
import * as _ from "lodash";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { FirebaseObjectObservable } from "angularfire2/database";

@Component({
  selector: 'app-resizable-frame',
  templateUrl: './resizable-frame.component.html',
  styleUrls: ['./resizable-frame.component.css']
})
export class ResizableFrameComponent implements OnInit {

  @ViewChild('rotate') rotate: ElementRef;
  @ViewChild('resize') resize: ElementRef;
  @ViewChild('content') content: ElementRef;
  _position$: FirebaseObjectObservable<ShapePosition>;
  _position: ShapePosition;

  @Input() set position$(pos: FirebaseObjectObservable<ShapePosition>) {
    this._position$ = pos;

    pos.subscribe(p => {
      this._position = p;

      this.styles = {
        'left.px': `${p.location.left}`,
        'top.px': `${p.location.top}`,
        'width.px': `${p.size.width}`,
        'height.px': `${p.size.height}`
      };

      this.safeTransform = this.sanitizer.bypassSecurityTrustStyle(`rotate(${p.location.rotation}rad)`);
    })
  }

  styles: any = {};
  safeTransform: SafeStyle;

  constructor(private sanitizer: DomSanitizer) {
    // this.safeTransform = this.sanitizer.bypassSecurityTrustStyle('rotate(45deg)');
  }

  ngOnInit() {
    this.mouseHelper(this.rotate,
      ({ initialPosition, deltaX, deltaY }) => {
        let ax = (initialPosition.size.height / 2) * Math.sin(initialPosition.location.rotation);
        let ay = (initialPosition.size.height / 2) * Math.cos(initialPosition.location.rotation);

        let cx = ax + deltaX;
        let cy = ay - deltaY;

        let rotation = Math.atan2(cx, cy);
        this._position$.update({location: {rotation: rotation, left: initialPosition.location.left, top: initialPosition.location.top}});

        // console.log(`ax: ${ax}, ay: ${ay}, cx: ${cx}, cy: ${cy}, rotation: ${this.position$.location.rotation}`);
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

        let width = initialPosition.size.width * rate;
        let height = initialPosition.size.height * rate;
        this._position$.update({size: {width: width, height: height}});
        // console.log(`ax: ${ax}, ay: ${ay}, bx: ${bx}, by: ${by}, cx: ${cx}, cy: ${cy}, dx: ${dx}, dy: ${dy}, rate: ${rate}, ${this.position$.size.width}, ${this.position$.size.height}`);
      });

    this.mouseHelper(this.content,
      ({ initialPosition, deltaX, deltaY }) => {
        let left = initialPosition.location.left + deltaX;
        let top = initialPosition.location.top + deltaY;
        this._position$.update({location: {left: left, top: top, rotation: initialPosition.location.rotation}});
      });
  }

  mouseHelper(element: ElementRef, onMouseMove: any) {
    Observable.fromEvent(element.nativeElement, 'mousedown')
      .flatMap((mdevt: MouseEvent) => {
        mdevt.preventDefault();
        // console.log(mdevt);

        let initialPosition = _.cloneDeep(this._position);
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
