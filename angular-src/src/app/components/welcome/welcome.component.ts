import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent {

    form: FormGroup;
    sentBoolean: Boolean;

    name = new FormControl("", Validators.required);
    email = new FormControl("", Validators.required);
    message = new FormControl("", Validators.required);

    constructor(fb: FormBuilder) {
        this.form = fb.group({
            "name": this.name,
            "email": this.email,
            "message": this.message
        });
    }

    onSubmitModelBased() {
        console.log(this.form);
        this.form.reset();
        this.sentBoolean = true;
    }

}
