import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';


@Injectable()
export class ApiService {
  apiBaseUrl: String

  constructor() { }

  get(endpoint, header, callback) {

  }

  post(endpoint, header, body, callback) {
    let headers
  }
}