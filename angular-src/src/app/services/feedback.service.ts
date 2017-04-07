import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';


@Injectable()
export class FeedbackService {
    
    constructor(private http:Http) { }

    newFeedback(feedback){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post(environment.baseUrl + '/api/feedback', feedback, {headers: headers})
        .map(res => res.json());
    }
}
