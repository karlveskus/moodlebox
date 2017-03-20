import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  problems: Object;
  registrationForm: FormGroup;
  email: FormControl;
  password: FormControl;
  passwordAgain: FormControl;

  constructor() {
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
        console.log('MINE')
      }
    } 
  }

  updateProblems() {
    let emailProblem = this.email.hasError('required') ? 'Väli on kohustuslik' : 'Ei ole emaili aadress';
    let passwordProblem = this.password.hasError('required') ? 'Väli on kohustuslik' : 'Liiga lihtne parool';
    let passwordAgainProblem = this.passwordAgain.hasError('required') ? 'Väli on kohustuslik' : 'Paroolid ei kattu';

    this.problems = {
      email: emailProblem,
      password: passwordProblem,
      passwordAgain: passwordAgainProblem
    };
  }

}