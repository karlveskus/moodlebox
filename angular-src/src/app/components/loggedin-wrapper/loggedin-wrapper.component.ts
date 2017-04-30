import { Component, ViewEncapsulation, DoCheck } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggedin-wrapper',
  templateUrl: './loggedin-wrapper.component.html',
  styleUrls: ['./loggedin-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoggedinWrapperComponent implements DoCheck {

  constructor(
    private authenticateService : AuthenticateService, 
    private router : Router
  ) { }

  ngDoCheck() {
    if (!this.authenticateService.isLoggedIn()) {
      this.authenticateService.logout();
      this.router.navigate(['/']);
    } 
  }

}
