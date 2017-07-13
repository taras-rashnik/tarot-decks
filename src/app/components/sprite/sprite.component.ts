import { Component, OnInit, Input } from '@angular/core';
import { Card } from "../../model/card";

@Component({
  selector: 'app-sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.css']
})
export class SpriteComponent implements OnInit {

  @Input() showBackSide: boolean = false;
  @Input() card: Card;

  constructor() { }

  ngOnInit() {
    console.log("SpriteComponent.ngOnInit");
  }

  get styles(): any {
    if (this.card) {
      return this.showBackSide ? this.card.backSideStyles : this.card.styles;
    } else {
      return {};
    }
  }

}
