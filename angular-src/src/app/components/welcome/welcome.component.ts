import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { Router } from '@angular/router';

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

  translatedText: string;
  supportedLanguages: any[];

  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
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
    this.feedbackForm.valueChanges.subscribe(data => {
      this.updateProblems();
    })
  }

  updateProblems() {
    let nameProblem = 'Väli on kohustuslik';
    let emailProblem = this.email.hasError('required') ? 'Väli on kohustuslik' : 'Ei ole emaili aadress';
    let messageProblem = 'Väli on kohustuslik';

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
      }

      this.feedbackService.newFeedback(feedback).subscribe(data => {
        if(data._id){
          this.feedbackSuccess = true;
          this.feedbackForm.reset();
        } 
      });
    } 
  }
}
