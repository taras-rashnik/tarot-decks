import { Component, OnInit } from '@angular/core';
import { Sprite } from "../../model/sprite";

@Component({
  selector: 'app-test-pane1',
  templateUrl: './test-pane1.component.html',
  styleUrls: ['./test-pane1.component.css']
})
export class TestPane1Component implements OnInit {

  sprites: Sprite[] = [
    {
      url: 'src/assets/decks/deck1/tarot_deck_01.png',
      left: -90,
      top: -147,
      width: 83,
      height: 141
    },
    {
      url: 'src/assets/decks/tarot_2.jpg',
      left: -79,
      top: -128,
      width: 78,
      height: 127
    },
    {
      url: 'src/assets/decks/tarot_3.png',
      left: -161,
      top: -259,
      width: 160,
      height: 258
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
