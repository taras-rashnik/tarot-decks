import { Component, OnInit } from '@angular/core';
import { Card } from "../../model/card";
import { CardMoniker } from "../../model/card-moniker";
import { DecksService } from "../../services/decks.service";

@Component({
  selector: 'app-main-pane',
  templateUrl: './main-pane.component.html',
  styleUrls: ['./main-pane.component.css']
})
export class MainPaneComponent implements OnInit {
  _cards: Card[] = [];

  constructor(private decksService: DecksService) { }

  ngOnInit() {
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    console.log('onDrop');
    let text = event.dataTransfer.getData("text");
    let cardMoniker: CardMoniker = JSON.parse(text);
    // card.left = event.clientX;
    // card.top = event.clientY;
    console.log(cardMoniker);
    
    this.decksService.getDeck(cardMoniker.deckId)
      .subscribe(d => {
        let card = d.getCard(cardMoniker.cardId);
        this._cards.push(card);
      });
    //this._cards.push(cardMoniker);
  }

  onDdragover(event: DragEvent): void {
    event.preventDefault();
    // event.dataTransfer.dropEffect = "copy";
  }
}
