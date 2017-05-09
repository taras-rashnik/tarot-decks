import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SessionService } from './services/session.service';
import { DecksService } from "./services/decks.service";

import { appRoutes } from "./routing";

import { AppComponent } from './app.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { CardsTableComponent } from './components/cards-table/cards-table.component';
import { DecksPaneComponent } from './components/decks-pane/decks-pane.component';
import { CardsPaneComponent } from './components/cards-pane/cards-pane.component';
import { MainPaneComponent } from './components/main-pane/main-pane.component';
import { TestPane1Component } from './components/test-pane1/test-pane1.component';
import { SpriteComponent } from './components/sprite/sprite.component';

@NgModule({
  declarations: [
    AppComponent,
    SessionsComponent,
    CardsTableComponent,
    DecksPaneComponent,
    CardsPaneComponent,
    MainPaneComponent,
    TestPane1Component,
    SpriteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    SessionService,
    DecksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
