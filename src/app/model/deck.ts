import { DeckInfo } from "./deck-info";
import { Card } from "./card";

export class Deck {

  cards: Card[] = [];
  backSide: Card;
  deckPicture: Card;

  constructor(public deckInfo: DeckInfo) {
    for (let j = 0; j < deckInfo.cardsInColumn; j++) {
      for (let i = 0; i < deckInfo.cardsInRow; i++) {
        if (this.cards.length >= deckInfo.cardsNumber) {
          break;
        }

        this.cards.push(new Card(this, j, i));
      }
    }

    this.backSide = new Card(this, this.calculateRow(deckInfo.backSideIndex, deckInfo.cardsInRow), this.calculateColumn(deckInfo.backSideIndex, deckInfo.cardsInRow));
    this.deckPicture = new Card(this, this.calculateRow(deckInfo.deckPictureIndex, deckInfo.cardsInRow), this.calculateColumn(deckInfo.deckPictureIndex, deckInfo.cardsInRow));
  }

  private calculateRow(index: number, cardsInRow: number) : number {
    return Math.floor(index / cardsInRow);
  }

  private calculateColumn(index: number, cardsInRow: number) : number {
    return Math.floor(index % cardsInRow);
  }

}