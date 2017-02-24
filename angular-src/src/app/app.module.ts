import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AlertModule } from 'ng2-bootstrap';
import { WelcomeJumbotronComponent } from './components/welcome-jumbotron/welcome-jumbotron.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeJumbotronComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
