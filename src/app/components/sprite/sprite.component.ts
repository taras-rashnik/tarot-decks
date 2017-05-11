import { Component, OnInit, Input } from '@angular/core';
import { Card } from "../../model/card";

@Component({
  selector: 'app-sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.css']
})
export class SpriteComponent implements OnInit {

  styles: any = {};

  constructor() { }

  @Input() set card(card: Card) {
    this.styles = card.styles;
  }

  ngOnInit() {
  }

}
