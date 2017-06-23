import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
// import 'rxjs/add/operator/map';
import { Session } from "../../model/session";
import { SessionService } from "../../services/session.service";
import { Deck } from "../../model/deck";
import { FirebaseObjectObservable } from "angularfire2/database";
import { DecksService } from "../../services/decks.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'cards-table',
  templateUrl: './cards-table.component.html',
  styleUrls: ['./cards-table.component.css']
})
export class CardsTableComponent implements OnInit {
  session: FirebaseObjectObservable<Session>;
  selectedDeck: Observable<Deck>;
  sessionId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private decksService: DecksService) {
  }

  onDeckSelected(deck: Deck): void {
    this.session.update({ selectedDeckId: deck.deckInfo.id });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.sessionId = params['id'];
      this.session = this.sessionService.getSessionById(this.sessionId);
      this.selectedDeck = this.session.switchMap(
        s => {
          return this.decksService.getDeck(s.selectedDeckId);
        });
    });
  }
}
