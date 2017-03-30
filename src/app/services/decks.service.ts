import { Injectable } from '@angular/core';
import { Deck } from "../model/deck";
import { Http, Response } from "@angular/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DecksService {

  constructor(private http: Http) { }

  getDecks(): Observable<Deck[]> {
    return this.http.get("src/assets/decks/decks.json")
      .map((res: Response) => res.json())
      .catch((error: Response) => {
        console.error(error);
        return Observable.throw(error);
      });
  }
}
