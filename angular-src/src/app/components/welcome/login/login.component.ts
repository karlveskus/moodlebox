import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from '../../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  problems: Object;
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(
    private authenticateService : AuthenticateService,
    private router : Router
  ) { 
    this.email = new FormControl(null, Validators.required);
    this.password = new FormControl(null, Validators.required);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
    this.updateProblems();
    this.loginForm.valueChanges.subscribe(data => {
      this.updateProblems();
    })
  }

  updateProblems() {
    let emailProblem = this.email.hasError('required') ? 'LOGIN.REQUIRED_FIELD' : 'LOGIN.INVALID_LOGIN';
    let passwordProblem = this.password.hasError('required') ? 'LOGIN.REQUIRED_FIELD' : 'LOGIN.INVALID_LOGIN';

    this.problems = {
      email: emailProblem,
      password: passwordProblem,
    };
  }

  onLoginSubmit() {
    this.updateProblems(); 
    for (let property in this.loginForm.controls) {
      this.loginForm.controls[property].markAsDirty();
      this.loginForm.controls[property].markAsTouched();
    }

    if (this.loginForm.valid) {
      this.authenticateUser();
    }
  }

  authenticateUser() {
    const user = {
      email: this.email.value,
      password: this.password.value
    }

    this.authenticateService.authenticateUser(user).subscribe(
      data => {
        if (data.success) {
          this.authenticateService.storeUserData(data.token);
          this.redirectAfterLogin();
        }
      }, 
      err => {
        if (err.status == 401) {
          for (let property in this.loginForm.controls) {
            this.loginForm.controls[property].setErrors({"INVALID_LOGIN": true});
          }
          this.updateProblems();
        }
      });
  }

  redirectAfterLogin() {
    let langingPage = localStorage.getItem('landing-page');

    if(langingPage) {
      this.router.navigate([langingPage]);
      localStorage.removeItem('landing-page');
    } else {
      this.router.navigate(['/route']);
    }
  }
}
