import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../translate/translate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  translatedText: string;
  supportedLanguages: any[];

  constructor(
    private _translate: TranslateService
  ) { 
    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Eesti', value: 'et' },
    ];
    
    if(localStorage.getItem('language')) {
      this.selectLang(localStorage.getItem('language'));
    } else {
      this.selectLang('et');
    }
  }

  ngOnInit() {
  }

  selectLang(lang: string) {
    this._translate.use(lang);
    localStorage.setItem('language', lang);
  }

}
