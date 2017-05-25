import { Component, OnInit, Input } from '@angular/core';
import { Card } from "../../model/card";
import { Deck } from "../../model/deck";

@Component({
  selector: 'app-cards-pane',
  templateUrl: './cards-pane.component.html',
  styleUrls: ['./cards-pane.component.css']
})
export class CardsPaneComponent implements OnInit {
  _selectedDeck: Deck;

  constructor() {
  }

  @Input() set selectedDeck(deck: Deck) {
    console.log('set selectedDeck');
    this._selectedDeck = deck;
  }

  ngOnInit() {
  }

  onDragStart(event: DragEvent, card: Card) : void {
    console.log('onDragStart: ', event, event.offsetX, event.offsetY);

    event.dataTransfer.dropEffect = "copy";
    let moniker = card.moniker;
    moniker.offsetX = event.offsetX;
    moniker.offsetY = event.offsetY;
    let target: any = event.target;
    moniker.clientWidth = target.clientWidth;
    moniker.clientHeight = target.clientHeight;
    event.dataTransfer.setData("text", JSON.stringify(moniker));
  }
}
