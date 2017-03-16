import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import {SessionService} from './services/session.service';

import { appRoutes } from "./routing";

import { AppComponent } from './app.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { CardsTableComponent } from './components/cards-table/cards-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SessionsComponent,
    CardsTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SessionService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
