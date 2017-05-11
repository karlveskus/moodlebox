import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class WelcomeComponent implements OnInit {
  feedbackForm: FormGroup;
  name: FormControl;
  email: FormControl;
  message: FormControl;

  feedbackSuccess: Boolean;
  problems: Object;

  constructor(
    private feedbackService: FeedbackService,
  ) {


    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('',[Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/)]);
    this.message = new FormControl('', Validators.required);        
  }

  ngOnInit() {
    this.feedbackForm = new FormGroup({
      name: this.name,
      email: this.email,
      message: this.message
    });
    this.updateProblems();
    this.feedbackForm.valueChanges.subscribe(() => {
      this.updateProblems();
    })
  }

  updateProblems() {
    let nameProblem = 'WELCOME.REQUIRED_FIELD';
    let emailProblem = this.email.hasError('required') ? 'WELCOME.REQUIRED_FIELD' : 'WELCOME.INVALID_EMAIL';
    let messageProblem = 'WELCOME.REQUIRED_FIELD';

    this.problems = {
      name: nameProblem,
      email: emailProblem,
      message: messageProblem
    };
  }

  onFeedbackSubmit() {
    this.updateProblems();
    for (let property in this.feedbackForm.controls) {
      this.feedbackForm.controls[property].markAsDirty();
      this.feedbackForm.controls[property].markAsTouched();
    }

    if (this.feedbackForm.valid) {
      const feedback = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
      };

      this.feedbackService.newFeedback(feedback).subscribe(data => {
        if(data._id){
          this.feedbackSuccess = true;
          this.feedbackForm.reset();
        } 
      });
    }
  }
}
