import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
// import 'rxjs/add/operator/map';
import { Session } from "../../model/session";
import { SessionService } from "../../services/session.service";
import { Deck } from "../../model/deck";
import { FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database";
import { DecksService } from "../../services/decks.service";
import { Observable } from "rxjs/Observable";
import { CardHolder } from "../../model/card-holder";

@Component({
  selector: 'cards-table',
  templateUrl: './cards-table.component.html',
  styleUrls: ['./cards-table.component.css']
})
export class CardsTableComponent implements OnInit {
  session: FirebaseObjectObservable<Session>;
  selectedDeck: Observable<Deck>;
  cardHolders: FirebaseListObservable<CardHolder[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private decksService: DecksService) {
  }

  onDeckSelected(deck: Deck): void {
    console.log('onDeckSelected');
    this.session.update({ selectedDeckId: deck.deckInfo.id });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let sessionId = params['id'];
      this.session = this.sessionService.getSessionById(sessionId);
      this.selectedDeck = this.session.switchMap(
        s => {
          console.log('this.session.switchMap');
          return this.decksService.getDeck(s.selectedDeckId);
        });

      console.log('CardsTableComponent.ngOnInit');
      this.cardHolders = this.sessionService.getCardHolders(sessionId);
    });
  }
}
