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
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(private authenticateService : AuthenticateService,
              private router : Router) { 
    this.email = new FormControl(null, Validators.required);
    this.password = new FormControl(null, Validators.required);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const user = {
        email: this.email.value,
        password: this.password.value
      }

      this.authenticateService.authenticateUser(user).subscribe(data => {
        if (data.success) {
          this.authenticateService.storeUserData(data.token);
          this.router.navigate(['/home']);
        } else {
          this.router.navigateByUrl('/');
        }
      });

    }
  }
}
