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
  }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/api/users/register', user, {headers: headers})
      .map(res => res.json());
  }
}