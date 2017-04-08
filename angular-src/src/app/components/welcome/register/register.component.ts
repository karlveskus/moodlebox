import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from '../../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  token = this.authenticateService.token;
  problems: Object;
  registrationForm: FormGroup;
  email: FormControl;
  password: FormControl;
  passwordAgain: FormControl;
  

  constructor(private authenticateService: AuthenticateService,
              private router: Router) {
    this.email = new FormControl('',[Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/)]);
    this.password = new FormControl('',[Validators.required, Validators.minLength(5)]);
    this.passwordAgain = new FormControl('',[Validators.required]);
    
  }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: this.email,
      password: this.password,
      passwordAgain: this.passwordAgain
    });
    this.updateProblems();
    this.registrationForm.valueChanges.subscribe(data => {
      this.updateProblems();
    })
  }

  onRegisterSubmit() {
    this.updateProblems(); 
    for (let property in this.registrationForm.controls) {
      this.registrationForm.controls[property].markAsDirty();
      this.registrationForm.controls[property].markAsTouched();
    }

    if (this.registrationForm.valid) {
      if (this.registrationForm.controls['password'].value != this.registrationForm.controls['passwordAgain'].value) {
        this.registrationForm.controls['passwordAgain'].setErrors({
          match: false
        });
      } else {
        this.registerUser();
      }
    } 
  }

  updateProblems() {
    let emailProblem = this.email.hasError('required') ? 'REGISTER.REQUIRED_FIELD' : 'REGISTER.INVALID_EMAIL';
    let passwordProblem = this.password.hasError('required') ? 'REGISTER.REQUIRED_FIELD' : 'REGISTER.BASIC_PASSWORD';
    let passwordAgainProblem = this.passwordAgain.hasError('required') ? 'REGISTER.REQUIRED_FIELD' : 'REGISTER.PASSWORD_DONT_MATCH';

    this.problems = {
      email: emailProblem,
      password: passwordProblem,
      passwordAgain: passwordAgainProblem
    };
  }

  registerUser() {
    const user = {
      email: this.email.value,
      password: this.password.value
    }

    this.authenticateService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.router.navigateByUrl('/');
      } else {
        console.log("REGISTRATION_ERROR");
      }
    });
  }

  onFacebookRegister() {
    console.log("FACEBOOK");
  }

  onGoogleRegister() {
    console.log("GOOGLE");
  }



}