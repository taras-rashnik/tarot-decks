import { Component, OnInit } from '@angular/core';
import { Session } from '../../model/session';
import { SessionService } from "../../services/session.service";

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

  ngOnInit() {
    this.sessionService.addSession("Session 1");
    this.sessionService.addSession("Session 2");
    this.sessionService.addSession("Session 3");
  }

  get Sessions() : Session[] {
    return this.sessionService.sessions;
  }

  addSession() {
    this.sessionService.addSession(this.sessionName);
  }

  removeSession(session: Session) {
    this.sessionService.removeSession(session);
  }
}
