import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/reusable/navbar/navbar.component';

import { AlertModule } from 'ng2-bootstrap';
import { CollapseModule } from 'ng2-bootstrap/collapse';

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

import { AuthenticateService } from './services/authenticate.service';
import { AuthGuard } from './services/auth.guard';
import { AdminComponent } from './components/loggedin-wrapper/content/admin/admin.component';

/* Possible roles
* 
*   logged-out
*   user
*   admin
*
*/

const appRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {roles: ['logged-out']},
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
    canActivate: [AuthGuard],
    data: {roles: ['logged-out']},
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
      canActivate: [AuthGuard],
      data: {roles: ['user', 'admin']},
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
      path: 'admin',
      canActivate: [AuthGuard],
      data: {roles: ['admin']},
      component: LoggedinWrapperComponent,
      children: [
          {
              path: '',
              component: AdminComponent,
              outlet: 'admin'
          }
      ]
  },
  {
      path: 'tests',
      canActivate: [AuthGuard],
      data: {roles: ['user', 'admin']},
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
      canActivate: [AuthGuard],
      data: {roles: ['user', 'admin']},
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
    SettingsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],

  providers: [FeedbackService, AuthenticateService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }