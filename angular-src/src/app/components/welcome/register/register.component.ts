import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    passwordAgain: new FormControl()
  });

  onRegisterSubmit() {
    console.log(this.registrationForm.value);
  }
  

}
