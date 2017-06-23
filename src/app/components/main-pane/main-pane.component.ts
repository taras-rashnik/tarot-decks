import { Component, OnInit, Input } from '@angular/core';
import { Card } from "../../model/card";
import { CardMoniker } from "../../model/card-moniker";
import { DecksService } from "../../services/decks.service";
import { CardHolder } from "../../model/card-holder";
import { Observable } from "rxjs/Observable";
import { FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'app-main-pane',
  templateUrl: './main-pane.component.html',
  styleUrls: ['./main-pane.component.css']
})
export class MainPaneComponent implements OnInit {
  @Input() cardHolders: FirebaseListObservable<CardHolder[]>;

  constructor(private decksService: DecksService) { }

  ngOnInit() {
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    console.log('onDrop', event);
    let text = event.dataTransfer.getData("text");
    let cardMoniker: CardMoniker = JSON.parse(text);
    console.log(cardMoniker);

    this.decksService.getDeck(cardMoniker.deckId)
      .subscribe(d => {
        let card = d.getCard(cardMoniker.cardId);

        let cardHolder: CardHolder = {
          cardId: card.id,
          deckId: cardMoniker.deckId,
          position: {
            location: { left: event.offsetX - cardMoniker.offsetX, top: event.offsetY - cardMoniker.offsetY, rotation: 0 },
            size: { width: cardMoniker.clientWidth + 20, height: cardMoniker.clientHeight + 20 }
          }
        };

        console.log(`before this.cardHolders.push`);
        console.log(this.cardHolders);
        this.cardHolders.push(cardHolder);
      });
  }

  onDdragover(event: DragEvent): void {
    event.preventDefault();
    // event.dataTransfer.dropEffect = "copy";
  }

  getCard(cardHolder: CardHolder): Observable<Card> {
    return this.decksService.getDeck(cardHolder.deckId).map(d => { return d.getCard(cardHolder.cardId) });
  }
}
