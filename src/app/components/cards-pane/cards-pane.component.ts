import { Component, OnInit, Input } from '@angular/core';
import { Card } from "../../model/card";
import { Deck } from "../../model/deck";

@Component({
  selector: 'app-cards-pane',
  templateUrl: './cards-pane.component.html',
  styleUrls: ['./cards-pane.component.css']
})
export class CardsPaneComponent implements OnInit {
  _cards: Card[] = [];
  _selectedDeck: Deck;

  constructor() {
  }

  @Input() set selectedDeck(deck: Deck) {
    console.log('set selectedDeck');
    this._selectedDeck = deck;
    this.updateCardsFromDeck(this._selectedDeck);
  }

  ngOnInit() {
  }

  updateCardsFromDeck(deck: Deck): void {
    this._cards.length = 0;

    if (!deck) {
      return;
    }

    for (let i = 0; i < deck.cardsInColumn; i++) {
      for (let j = 0; j < deck.cardsInRow; j++) {
        let card: Card = new Card();
        card.name = `card row:${i} col:${j}`;
        let left = -Math.floor(j * (deck.cardsWidth + deck.horizontalGap));
        let top = -Math.floor(i * (deck.cardsHeight + deck.verticalGap));
        
        card.picture = {};
        card.picture.styles = {
          'background-repeat': 'no-repeat',
          'background-position-x.px': left,
          'background-position-y.px': top,
          'width.px': deck.cardsWidth,
          'height.px': deck.cardsHeight,
          'background-image': `url(${deck.imageUrl})`
        };

        this._cards.push(card);
      }
    }
  }
}
