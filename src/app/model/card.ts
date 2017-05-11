import { Deck } from "./deck";

export class Card {

  styles: any = {};

  constructor(private deck: Deck, row: number, column: number) {
    this.styles = {
      'background-repeat': 'no-repeat',
      'background-position-x.px': -column * (deck.deckInfo.cardsWidth + deck.deckInfo.horizontalGap),
      'background-position-y.px': -row * (deck.deckInfo.cardsHeight + deck.deckInfo.verticalGap),
      'width.px': deck.deckInfo.cardsWidth,
      'height.px': deck.deckInfo.cardsHeight,
      'background-image': `url(${deck.deckInfo.imageUrl})`,
      'transform-origin': '0 0',
      'transform': `scale(${200 / deck.deckInfo.cardsWidth}, ${300 / deck.deckInfo.cardsHeight})`
    };
  }
}
