import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    lat: number = 58.3768154;
    lng: number = 26.7175982;
    zoom: number = 15;

    constructor() { }

    ngOnInit() {
    }

}
