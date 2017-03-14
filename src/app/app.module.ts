import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {SessionService} from './services/session.service';

import { AppComponent } from './app.component';
import { SessionsComponent } from './components/sessions/sessions.component';

@NgModule({
  declarations: [
    AppComponent,
    SessionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SessionService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
