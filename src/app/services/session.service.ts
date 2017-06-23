import { Injectable } from '@angular/core';
import { Session } from "../model/session";
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";

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

  removeSessionById(id: string) {
     this.sessions.remove(id);
  }

  getSessionById(id: number) : FirebaseObjectObservable<Session> {
    return this.angularFirebase.object(`/sessions/${id}`);
  }
}
