import { Component, OnInit } from '@angular/core';
import { Card } from "../../model/card";

@Component({
  selector: 'app-main-pane',
  templateUrl: './main-pane.component.html',
  styleUrls: ['./main-pane.component.css']
})
export class MainPaneComponent implements OnInit {
  _cards: Card[] = [];

  constructor() { }

  ngOnInit() {
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    console.log('onDrop');
    let text = event.dataTransfer.getData("text");
    let card: Card = JSON.parse(text);
    // card.left = event.clientX;
    // card.top = event.clientY;
    console.log(card);
    this._cards.push(card);
  }

  onDdragover(event: DragEvent): void {
    event.preventDefault();
    // event.dataTransfer.dropEffect = "copy";
  }

  onDragStart(event: DragEvent, card: Card): void {
    console.log('onDragStart');

    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text", JSON.stringify(card));
  }

  onDragEnd(event: DragEvent, card: Card): void {
    console.log('onDragEnd');

    if (event.dataTransfer.dropEffect === "move") {
      let index = this._cards.findIndex(c => c === card);
      if (index >= 0) {
        this._cards.splice(index, 1);
      }
    }
    else
      throw new Error("test");
  }
}
