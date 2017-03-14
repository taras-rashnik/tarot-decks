import { Injectable } from '@angular/core';
import { Session } from "../model/session";

@Injectable()
export class SessionService {
  sessions: Session[] = [];

  constructor() { 
    console.log('SessionService initialized');
  }

  addSession(name) {
    this.sessions.push(new Session(name));
    console.log('addSession name. this.sessions.length = ' + this.sessions.length);
  }

  removeSession(session: Session) {
    var index: number = this.sessions.indexOf(session, 0);
    this.sessions.splice(index, 1);
  }
}
