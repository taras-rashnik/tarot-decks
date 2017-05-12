import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resizable-frame',
  templateUrl: './resizable-frame.component.html',
  styleUrls: ['./resizable-frame.component.css']
})
export class ResizableFrameComponent implements OnInit {

  @Input() left: number = 10;
  @Input() top: number = 10;
  @Input() width: number = 100;
  @Input() height: number = 150;

  styles: any = {};

  constructor() { }

  ngOnInit() {
    this.styles = {
      'left.px': `${this.left}`,
      'top.px': `${this.top}`,
      'width.px': `${this.width}`,
      'height.px': `${this.height}`,
    };
  }

}
