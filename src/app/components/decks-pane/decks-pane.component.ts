import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Deck } from "../../model/deck";
import { DecksService } from "../../services/decks.service";
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-decks-pane',
  templateUrl: './decks-pane.component.html',
  styleUrls: ['./decks-pane.component.css']
})
export class DecksPaneComponent implements OnInit {
  decks: Deck[] = [];
  selectedDeck: Deck;

  constructor(private decksService: DecksService) {
  }

  @Output() deckSelected: EventEmitter<Deck> = new EventEmitter<Deck>();

  onImageClick(deck: Deck) : void {
    console.log('onImageClick');
    this.selectedDeck = deck;
    this.deckSelected.emit(this.selectedDeck);
  }

  ngOnInit() {
    this.decksService.getDecks().subscribe((decks: Deck[]) => {
      this.decks = decks;
      this.onImageClick(decks[0]);

      // let deck: Deck;
      // for (deck of this.decks) {
      //   deck.picture = {
      //     left: 0,
      //     top: 0,
      //     width: deck.cardsWidth,
      //     height: deck.cardsHeight,
      //     url: `url(${deck.imageUrl})`
      //   };

      //   deck.picture.styles = {
      //     'background-repeat': 'no-repeat',
      //     'background-position-x.px': 0,
      //     'background-position-y.px': 0,
      //     'width.px': deck.cardsWidth,
      //     'height.px': deck.cardsHeight,
      //     'background-image': `url(${deck.imageUrl})`
      //   };
      // }
    });
  }

}
