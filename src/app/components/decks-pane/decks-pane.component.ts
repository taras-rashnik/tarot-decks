import { Component, OnInit } from '@angular/core';
import { Deck } from "../../model/deck";

@Component({
  selector: 'app-decks-pane',
  templateUrl: './decks-pane.component.html',
  styleUrls: ['./decks-pane.component.css']
})
export class DecksPaneComponent implements OnInit {
  decks: Deck[] = [];

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
        let deck: any = new Deck(`deck${i}`);
        deck.picture = {
          left: Math.floor(left),
          top: Math.floor(top),
          width: width,
          height: height,
          url: 'url(../../../assets/decks/deck1/tarot_deck_01.png)'
        };

        this.decks.push(deck);

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
