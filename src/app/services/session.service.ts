import { Injectable } from '@angular/core';
import { Session } from "../model/session";
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { ShapePosition } from "../model/shape-position";
import { CardHolder } from "../model/card-holder";

@Injectable()
export class SessionService {
  public sessions: FirebaseListObservable<Session[]>;

  constructor(private angularFirebase: AngularFireDatabase) { 
    this.sessions = angularFirebase.list('/sessions');
  }

  addSession(name) {
    this.sessions.push(new Session(name));
  }

  removeSessionById(sessionId: string) {
     this.sessions.remove(sessionId);
  }

  getSessionById(sessionId: string) : FirebaseObjectObservable<Session> {
    return this.angularFirebase.object(`/sessions/${sessionId}`);
  }

  getCardHolders(sessionId: string): FirebaseListObservable<CardHolder[]>{
    return this.angularFirebase.list(`/sessions/${sessionId}/cardholders`);
  }

  getCardHolderPosition(sessionId: string, cardHolderId: string): FirebaseObjectObservable<ShapePosition>{
    return this.angularFirebase.object(`/sessions/${sessionId}/cardholders/${cardHolderId}/position`);
  }
}
