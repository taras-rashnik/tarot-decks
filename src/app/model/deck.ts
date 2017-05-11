import { DeckInfo } from "./deck-info";
import { Card } from "./card";

export class Deck {

  cards: Card[] = [];
  backSide: Card;
  deckPicture: Card;

  constructor(public deckInfo: DeckInfo) {
    for (let j = 0; j < deckInfo.cardsInColumn; j++) {
      for (let i = 0; i < deckInfo.cardsInRow; i++) {
        this.cards.push(new Card(this, j, i));
      }
    }

    this.backSide = new Card(this, 0, 0);
    this.deckPicture = new Card(this, 0, 0);
  }

}