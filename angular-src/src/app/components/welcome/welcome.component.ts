import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomeComponent implements OnInit {
  lat: number = 58.3768154;
  lng: number = 26.7175982;
  zoom: number = 15;


  constructor() { }

  ngOnInit() {
  }

}
