import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticateService{
  baseUrl: string;
  token: any;
  user: {email:String, role:String};
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http){
    this.baseUrl = environment.baseUrl;
    this.user = {email: null, role: null};
  }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/api/user/', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/api/user/authenticate', user,  {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token) {
    localStorage.setItem('id_token', token);
  }

  logout() {
    this.token = null;
    this.clearUser();
    localStorage.removeItem('id_token');
  }

  loadTokenAndData() {
    if (this.user.email == null) {
      this.token = localStorage.getItem('id_token');
      if (this.token != null) {
        console.log('loading');
        this.user = {
          email: this.getEmail(this.token),
          role: this.getRole(this.token)
        }
      }
    }
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  isAdmin() {
    return this.user.role == 'admin';
  }

  isUser() {
    return this.user.role == 'user';
  }

  clearUser() {
    this.user.email = null;
    this.user.role = null;
  }

  private getRole(token) {
    return this.jwtHelper.decodeToken(token).role;
  }

  private getEmail(token) {
    return this.jwtHelper.decodeToken(token).email;
  }

}