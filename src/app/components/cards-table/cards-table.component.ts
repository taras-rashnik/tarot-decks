import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
// import 'rxjs/add/operator/map';
import { Session } from "../../model/session";
import { SessionService } from "../../services/session.service";

@Component({
  selector: 'cards-table',
  templateUrl: './cards-table.component.html',
  styleUrls: ['./cards-table.component.css']
})
export class CardsTableComponent implements OnInit {
  session: Session;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService) {       
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      // (+) converts string 'id' to a number
      this.session = this.sessionService.getSessionById(+params['id']);
    });
  }

}
