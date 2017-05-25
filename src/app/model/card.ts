import { Deck } from "./deck";
import { CardMoniker } from "./card-moniker";

export class Card {

  styles: any = {};
  id: number;

  constructor(private deck: Deck, { row, column }: { row: number, column: number }) {
    
    this.id = column + row * deck.deckInfo.cardsInRow;

    let horizontalPercentage = column * 100 / (deck.deckInfo.cardsInRow - 1);
    let verticalPercentage = row * 100 / (deck.deckInfo.cardsInColumn - 1);
    this.styles = {
      'background-repeat': 'no-repeat',
      'width': '100%',
      'height': '100%',
      'background-position': `${horizontalPercentage}% ${verticalPercentage}%`,
      'background-image': `url(${deck.deckInfo.imageUrl})`,
      'background-size': `${deck.deckInfo.cardsInRow * 100}% ${deck.deckInfo.cardsInColumn * 100}%`,
    };
  }

  get moniker(): CardMoniker {
    return {
      cardId: this.id,
      deckId: this.deck.deckInfo.id
    }
  }
}
