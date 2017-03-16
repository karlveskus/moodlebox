import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/reusable/navbar/navbar.component';
import { AlertModule } from 'ng2-bootstrap';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RulerComponent } from './components/reusable/ruler/ruler.component';
import { LoginComponent } from './components/welcome/login/login.component';
import { RegisterComponent } from './components/welcome/register/register.component';

import { FeedbackService } from './services/feedback.service';
import { FooterComponent } from './components/reusable/footer/footer.component';
import { LoggedinWrapperComponent } from './components/loggedin-wrapper/loggedin-wrapper.component';
import { SidebarComponent } from './components/loggedin-wrapper/sidebar/sidebar.component';
import { HomeComponent } from './components/loggedin-wrapper/content/home/home.component';
import { TestsComponent } from './components/loggedin-wrapper/content/tests/tests.component';
import { SettingsComponent } from './components/loggedin-wrapper/content/settings/settings.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        outlet: 'login'
      }
    ]
  },
  {
    path: 'register',
    component: WelcomeComponent,
    children: [
      {
        path: '',
        component: RegisterComponent,
        outlet: 'register'
      }
    ]
  },
  {
      path: 'home',
      component: LoggedinWrapperComponent,
      children: [
          {
              path: '',
              component: HomeComponent,
              outlet: 'home'
          }
      ]
  },
  {
      path: 'tests',
      component: LoggedinWrapperComponent,
      children: [
          {
              path: '',
              component: TestsComponent,
              outlet: 'tests'
          }
      ]
  },
  {
      path: 'settings',
      component: LoggedinWrapperComponent,
      children: [
          {
              path: '',
              component: SettingsComponent,
              outlet: 'settings'
          }
      ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    NotFoundComponent,
    RulerComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    LoggedinWrapperComponent,
    SidebarComponent,
    HomeComponent,
    TestsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD2qA7279xnKdrKlliN4PMv6B7Dt4KJt9E'
    }),
    HttpModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [FeedbackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
