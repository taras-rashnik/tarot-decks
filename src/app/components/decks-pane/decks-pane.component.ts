import { Component, OnInit } from '@angular/core';
import { Deck } from "../../model/deck";

@Component({
  selector: 'app-decks-pane',
  templateUrl: './decks-pane.component.html',
  styleUrls: ['./decks-pane.component.css']
})
export class DecksPaneComponent implements OnInit {
  decks: Deck[] = [];

  constructor() { 
    for(let i = 0; i <40; i++){
      this.decks.push(new Deck(`deck${i}`));
    }
  }

  ngOnInit() {
  }

}
