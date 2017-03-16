import { Routes } from '@angular/router';
import { SessionsComponent } from "./components/sessions/sessions.component";
import { CardsTableComponent } from "./components/cards-table/cards-table.component";

export const appRoutes: Routes = [
  { path: '',      component: SessionsComponent },
  { path: 'sessions/:id',      component: CardsTableComponent }
];
