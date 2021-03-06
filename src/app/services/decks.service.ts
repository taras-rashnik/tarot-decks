import { Injectable } from '@angular/core';
import { Deck } from "../model/deck";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DeckInfo } from "../model/deck-info";

@Injectable()
export class DecksService {

  decks: Deck[];

  constructor(private http: Http) { }

  getDecks(): Observable<Deck[]> {
    if (this.decks) {
      return Observable.of(this.decks);
    }

    return this.http.get("./assets/decks/decks.json")
      .map((res: Response) => {
        let deckInfos: DeckInfo[] = res.json();
        this.decks = deckInfos.map(di => new Deck(di));
        return deckInfos.map(di => new Deck(di));
      })
      .catch((error: Response) => {
        console.error(error);
        return Observable.throw(error);
      });
  }

  getDeck(id: number): Observable<Deck> {
    return this.getDecks().map(ds => ds.find(d => d.deckInfo.id === id));
  }
}
