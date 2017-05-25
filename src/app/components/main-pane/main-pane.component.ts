import { Component, OnInit } from '@angular/core';
import { Card } from "../../model/card";
import { CardMoniker } from "../../model/card-moniker";
import { DecksService } from "../../services/decks.service";
import { CardHolder } from "../../model/card-holder";

@Component({
  selector: 'app-main-pane',
  templateUrl: './main-pane.component.html',
  styleUrls: ['./main-pane.component.css']
})
export class MainPaneComponent implements OnInit {
  _cardHolders: CardHolder[] = [];

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
          card: card,
          position: { 
            location: { left: event.offsetX - cardMoniker.offsetX, top: event.offsetY - cardMoniker.offsetY, rotation: 0 }, 
            size: { width: cardMoniker.clientWidth + 20, height: cardMoniker.clientHeight + 20 } }
        };

        this._cardHolders.push(cardHolder);
      });
  }

  onDdragover(event: DragEvent): void {
    event.preventDefault();
    // event.dataTransfer.dropEffect = "copy";
  }
}
