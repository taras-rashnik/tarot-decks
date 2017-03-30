import { Injectable } from '@angular/core';
import { Deck } from "../model/deck";

@Injectable()
export class DecksService {

  constructor() { }

  getDecks(): Deck[] {
    return [
      {
        id: 1,
        name: "the first deck",
        imageUrl: "src/assets/decks/deck1/tarot_deck_01.png",
        cardsWidth: 83,
        cardsHeight: 141,
        horizontalGap: 7.5,
        verticalGap: 6,
        cardsInRow: 11,
        cardsInColumn: 5,
        cardsNumber: 55
      },
      {
        id: 2,
        name: "the second deck",
        imageUrl: "src/assets/decks/tarot_2.jpg",
        cardsWidth: 78,
        cardsHeight: 127,
        horizontalGap: 1,
        verticalGap: 1,
        cardsInRow: 13,
        cardsInColumn: 6,
        cardsNumber: 78
      },
      {
        id: 3,
        name: "the third deck",
        imageUrl: "src/assets/decks/tarot_3.png",
        cardsWidth: 160,
        cardsHeight: 258,
        horizontalGap: 1,
        verticalGap: 1,
        cardsInRow: 10,
        cardsInColumn: 7,
        cardsNumber: 70
      }
    ];
  }
}
