import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent {

    form: FormGroup;
    feedbackSuccess: Boolean;

    name = new FormControl();
    email = new FormControl();
    message = new FormControl();

    constructor(
        private fb: FormBuilder,
        private feedbackService: FeedbackService
    ) {
        this.form = fb.group({
            "name": this.name,
            "email": this.email,
            "message": this.message
        });
    }

    onSubmitModelBased() {
        const feedback = {
            name: this.name.value,
            email: this.email.value,
            message: this.message.value
        }

        if(!this.feedbackService.validateFeedback(feedback)) {
            this.feedbackSuccess = false;
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
