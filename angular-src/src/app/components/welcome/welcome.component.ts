import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class WelcomeComponent implements OnInit {
    form: FormGroup;
    feedbackSuccess: Boolean;
    errorMessage: String;

    name = new FormControl();
    email = new FormControl();
    message = new FormControl();

    constructor(
        private fb: FormBuilder,
        private feedbackService: FeedbackService,
        private router: Router,
        private authenticateService: AuthenticateService
    ) {
        this.form = fb.group({
            "name": this.name,
            "email": this.email,
            "message": this.message
        });
    }

    ngOnInit() {
    }

    onSubmitModelBased() {
        const feedback = {
            name: this.name.value,
            email: this.email.value,
            message: this.message.value
        }

        if(!this.feedbackService.validateFeedback(feedback)) {
            this.feedbackSuccess = false;
            this.errorMessage = "Palun täida ära kõik lahtrid!";
            return false;
        }

        if(!this.feedbackService.validateEmail(feedback.email)) {
            this.feedbackSuccess = false;
            this.errorMessage = "Lisa korrektne email!";
            return false;
        }

        this.feedbackService.newFeedback(feedback).subscribe(data => {
          if(data.success){
            this.feedbackSuccess = true;
            this.form.reset();
          } else {
            console.log("Feedback saving failed.");
          }
        });
    }
}
