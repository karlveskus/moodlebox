import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';


@Injectable()
export class FeedbackService {
    feedback: any

    constructor(private http:Http) { }

    validateFeedback(feedback){
        if (feedback.name == undefined || feedback.email == undefined || feedback.message == undefined) {
            return false;
        } else {
            return true;
        }
    }

    validateEmail(email){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    newFeedback(feedback){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post(environment.baseUrl + '/api/feedback', feedback, {headers: headers})
        .map(res => res.json());
    }
}
