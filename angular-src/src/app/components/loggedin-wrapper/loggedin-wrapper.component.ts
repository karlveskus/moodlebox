import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggedin-wrapper',
  templateUrl: './loggedin-wrapper.component.html',
  styleUrls: ['./loggedin-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoggedinWrapperComponent implements OnInit {

  constructor(private authenticateService : AuthenticateService, private router : Router) { }

  ngOnInit() {
  }

}
