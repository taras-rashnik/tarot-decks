import { Component, OnInit } from '@angular/core';
import {Session} from '../../session';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  sessions: Session[] = [];

  constructor() { }

  ngOnInit() {
  }

}
