import { Component, OnInit, Input } from '@angular/core';
import { Sprite } from "../../model/sprite";

@Component({
  selector: 'app-sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.css']
})
export class SpriteComponent implements OnInit {

  styles: any = {
    'background-repeat': 'no-repeat',
    'background-position-x.px': 0,
    'background-position-y.px': 0,
    'width.px': 100,
    'height.px': 150,
    'background-image': `url("")`
  };

  @Input() set sprite(sprite: Sprite) {
    this.styles = {
      'background-repeat': 'no-repeat',
      'background-position-x.px': sprite.left,
      'background-position-y.px': sprite.top,
      'width.px': sprite.width,
      'height.px': sprite.height,
      'background-image': `url(${sprite.url})`
    };
  }

  constructor() { }

  ngOnInit() {
  }

}
