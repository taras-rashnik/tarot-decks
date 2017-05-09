import { Routes } from '@angular/router';
import { SessionsComponent } from "./components/sessions/sessions.component";
import { CardsTableComponent } from "./components/cards-table/cards-table.component";
import {TestPane1Component } from "./components/test-pane1/test-pane1.component";

export const appRoutes: Routes = [
  { path: '',      component: SessionsComponent },
  { path: 'sessions/:id',      component: CardsTableComponent },
  { path: 'test-pane1',      component: TestPane1Component }
];
