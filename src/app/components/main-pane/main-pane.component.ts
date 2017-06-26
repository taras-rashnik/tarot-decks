import { Component, OnInit, Input } from '@angular/core';
import { Card } from "../../model/card";
import { CardMoniker } from "../../model/card-moniker";
import { DecksService } from "../../services/decks.service";
import { CardHolder } from "../../model/card-holder";
import { Observable } from "rxjs/Observable";
import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { SessionService } from "../../services/session.service";
import { ShapePosition } from "../../model/shape-position";

@Component({
  selector: 'app-main-pane',
  templateUrl: './main-pane.component.html',
  styleUrls: ['./main-pane.component.css']
})
export class MainPaneComponent implements OnInit {
  @Input() sessionId: string;
  cardHolders: FirebaseListObservable<CardHolder[]>;
  selectedHolderId: string;

  constructor(
    private decksService: DecksService,
    private sessionService: SessionService) { }

  ngOnInit() {
    this.cardHolders = this.sessionService.getCardHolders(this.sessionId);
  }

  onSelect(holderId: string): void {
    console.log(`MainPaneComponent.onSelect(${holderId})`);
    this.selectedHolderId = holderId;
  }

  unselectAll(event: MouseEvent): void {
    let target: any = event.target;
    if (target.id === "main") {
      console.log(event);
      this.selectedHolderId = null;
    }
  }

  isSelected(holderId: string): boolean {
    return this.selectedHolderId === holderId;
  }

  onDelete(holderId: string) {
    this.cardHolders.remove(holderId);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    console.log('onDrop', event);
    let text = event.dataTransfer.getData("text");
    let cardMoniker: CardMoniker = JSON.parse(text);
    // console.log(cardMoniker);

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

        this.cardHolders.push(cardHolder)
          .then(e => {this.onSelect(e.key);});
      });
  }

  onDdragover(event: DragEvent): void {
    event.preventDefault();
    // event.dataTransfer.dropEffect = "copy";
  }

  getCard(cardHolder: CardHolder): Observable<Card> {
    return this.decksService.getDeck(cardHolder.deckId).map(d => { return d.getCard(cardHolder.cardId) });
  }

  getCardHolderPosition(cardHolderId: string): FirebaseObjectObservable<ShapePosition> {
    return this.sessionService.getCardHolderPosition(this.sessionId, cardHolderId);
  }
}
