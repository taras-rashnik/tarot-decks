import { Component, OnInit } from '@angular/core';
import { Card } from "../../model/card";

@Component({
  selector: 'app-cards-pane',
  templateUrl: './cards-pane.component.html',
  styleUrls: ['./cards-pane.component.css']
})
export class CardsPaneComponent implements OnInit {
  cards: Card[] = [];

  constructor() {
    const width = 83;
    const height = 141;
    const deltaWidth = 7.5;
    const deltaHeight = 6;
    let left = 0;
    let top = 0;

    for (let i = 0; i < 11; i++) {
      top = 0;

      for (let j = 0; j < 5; j++) {
        let card: any = new Card();
        card.name = `card_${i}_${j}`;
        card.picture = {
          left: Math.floor(left),
          top: Math.floor(top),
          width: width,
          height: height,
          url: 'url(../../../assets/decks/deck1/tarot_deck_01.png)'
        };

        card.picture.styles = {
          'background-repeat': 'no-repeat',
          'background-position-x.px': Math.floor(left),
          'background-position-y.px': Math.floor(top),
          'width.px': width,
          'height.px': height,
          'background-image': 'url(../../../../src/assets/decks/deck1/tarot_deck_01.png)'
        };

        this.cards.push(card);

        top -= height;
        top -= deltaHeight;
      }

      left -= width;
      left -= deltaWidth;
    }
  }

  ngOnInit() {
  }

}
