import { DeckInfo } from "./deck-info";
import { Card } from "./card";

export class Deck {

  cards: Card[] = [];
  backSide: Card;
  deckPicture: Card;

  constructor(public deckInfo: DeckInfo) {
    this.backSide = new Card(this, this.calculateRowAndColumn(deckInfo.backSideIndex, deckInfo.cardsInRow));
    this.deckPicture = new Card(this, this.calculateRowAndColumn(deckInfo.deckPictureIndex, deckInfo.cardsInRow));

    for (let j = 0; j < deckInfo.cardsInColumn; j++) {
      for (let i = 0; i < deckInfo.cardsInRow; i++) {
        if (this.cards.length >= deckInfo.cardsNumber) {
          break;
        }

        this.cards.push(new Card(this, {row:j, column:i}));
      }
    }
  }

  getCard(id: number): Card {
    return this.cards.find(c => c.id === id);
  }

  private calculateRow(index: number, cardsInRow: number) : number {
    return Math.floor(index / cardsInRow);
  }

  private calculateColumn(index: number, cardsInRow: number) : number {
    return Math.floor(index % cardsInRow);
  }

  
  private calculateRowAndColumn(index: number, cardsInRow: number) : any {
    return { 
      row: Math.floor(index / cardsInRow),
      column: Math.floor(index % cardsInRow)
    };
  }

}