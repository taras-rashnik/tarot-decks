import { Injectable } from '@angular/core';
import { Session } from "../model/session";
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { CardHolder } from "../model/card-holder";

@Injectable()
export class SessionService {
  public sessions: FirebaseListObservable<Session[]>;

  constructor(private angularFirebase: AngularFireDatabase) { 
    console.log('SessionService initialized');
    this.sessions = angularFirebase.list('/sessions');
  }

  addSession(name) {
    this.sessions.push(new Session(name));
    console.log('addSession name. this.sessions.length = ' + this.sessions.count);
  }

  removeSessionById(sessionId: string) {
     this.sessions.remove(sessionId);
  }

  getSessionById(sessionId: string) : FirebaseObjectObservable<Session> {
    return this.angularFirebase.object(`/sessions/${sessionId}`);
  }

  getCardHolders(sessionId: string): FirebaseListObservable<CardHolder[]>{
    console.log(`SessionService.getCardHolders(${sessionId})`);
    let holders = this.angularFirebase.list(`/sessions/${sessionId}/cardholders`)
    console.log(holders);
    return holders;
  }
}
