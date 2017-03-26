import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { AuthenticateService } from './authenticate.service';


@Injectable()
export class UserService{
  baseUrl: string;
  user: {email:String, role:String};

  constructor(
    private http: Http,
    private authenticateService : AuthenticateService)
  {
    this.baseUrl = environment.baseUrl;
    this.user = {email: null, role: null};
    this.authenticateService.loadTokenAndData();
  }

  getAllUsers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', this.authenticateService.token);
    return this.http.get(this.baseUrl + '/api/users', {headers: headers})
      .map(res => res.json());
  }

}