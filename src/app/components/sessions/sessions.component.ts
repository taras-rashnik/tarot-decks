import { Component, OnInit } from '@angular/core';
import { Session } from '../../model/session';
import { SessionService } from "../../services/session.service";
import { FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  sessionName: string;

  constructor(private sessionService: SessionService) {
    console.log('SessionsComponent initialized');
  }

  ngOnInit() {  }

  get Sessions() : FirebaseListObservable<Session[]> {
    return this.sessionService.sessions;
  }

  addSession() {
    this.sessionService.addSession(this.sessionName);
  }

  removeSessionById(id: string) {
    this.sessionService.removeSessionById(id);
  }
}
