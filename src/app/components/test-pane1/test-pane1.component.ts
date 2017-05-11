import { Component, OnInit } from '@angular/core';
import { DecksService } from "../../services/decks.service";
import { Deck } from "../../model/deck";

@Component({
  selector: 'app-test-pane1',
  templateUrl: './test-pane1.component.html',
  styleUrls: ['./test-pane1.component.css']
})
export class TestPane1Component implements OnInit {

  decks: Deck[];

  constructor(private decksService: DecksService) { }

  ngOnInit() {
    this.decksService.getDecks().subscribe((decks: Deck[]) => {
      this.decks = decks;
      console.log(this.decks);
    });
  }

}
