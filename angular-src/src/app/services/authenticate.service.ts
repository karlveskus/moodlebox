import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticateService {
  baseUrl: string;
  token: any;
  user: any;

  constructor(private http: Http){
    this.baseUrl = environment.baseUrl;
    this.user = {email: null, admin: false}
  }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/api/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/api/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, email) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('email', email);
    this.token = token;
    this.user.email = email;
  }
}