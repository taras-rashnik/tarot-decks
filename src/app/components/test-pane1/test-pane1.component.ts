import { Component, OnInit } from '@angular/core';
import { DecksService } from "../../services/decks.service";
import { Deck } from "../../model/deck";
import { CardHolder } from "../../model/card-holder";

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Card } from "../../model/card";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-test-pane1',
  templateUrl: './test-pane1.component.html',
  styleUrls: ['./test-pane1.component.css']
})
export class TestPane1Component implements OnInit {

  decks: Deck[];
  cardHolder: CardHolder;

  constructor(private decksService: DecksService) { }

  ngOnInit() {
    this.decksService.getDecks().subscribe((decks: Deck[]) => {
      this.decks = decks;

      this.cardHolder = {
        cardId: this.decks[3].cards[15].id,
        deckId: this.decks[3].deckInfo.id,
        position: {location: {left: 600,top: 250,rotation: 0}, size: {width: 200,height: 300}}
      };
    });
  }

  getCard(cardHolder: CardHolder): Observable<Card>{
    return this.decksService.getDeck(cardHolder.deckId).map(d => {return d.getCard(cardHolder.cardId)});
  }

}
