import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-resizable-frame',
  templateUrl: './resizable-frame.component.html',
  styleUrls: ['./resizable-frame.component.css']
})
export class ResizableFrameComponent implements OnInit {

  @ViewChild('rotate') rotate: ElementRef;
  @ViewChild('resize') resize: ElementRef;

  @Input() left: number = 10;
  @Input() top: number = 10;
  @Input() width: number = 100;
  @Input() height: number = 150;

  styles: any = {};

  constructor() { }

  updateStyles() {
    this.styles = {
      'left.px': `${this.left}`,
      'top.px': `${this.top}`,
      'width.px': `${this.width}`,
      'height.px': `${this.height}`,
    };
  }

  ngOnInit() {
    this.updateStyles();

    Observable.fromEvent(this.rotate.nativeElement, 'mousedown')
      .flatMap((mdevt: MouseEvent) => {
        mdevt.preventDefault();
        // console.log(mdevt);

        let initialLeft: number = +this.left;
        let initialTop: number = +this.top;
        let startX: number = mdevt.clientX;
        let startY: number = mdevt.clientY;

        return Observable.fromEvent(document, 'mousemove')
          .map((mmevt: MouseEvent) => {
            mmevt.preventDefault();

            let newLeft: number = initialLeft + (mmevt.clientX - startX);
            let newTop: number = initialTop + (mmevt.clientY - startY);
            return {
              x: newLeft,
              y: newTop
            };
          })
          .takeUntil(Observable.fromEvent(document, 'mouseup'));
      })
      .subscribe((p) => {
        // console.log(p);
        this.left = p.x;
        this.top = p.y;
        this.updateStyles();
      });

  }

}
