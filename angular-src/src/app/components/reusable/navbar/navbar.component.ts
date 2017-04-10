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
  activeLanguage: any;

  constructor(
    private _translate: TranslateService
  ) { 
    this.supportedLanguages = [
      { display: 'EST', value: 'et' },
      { display: 'ENG', value: 'en' },
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
    this.activeLanguage = lang;
  }

  getColor(lang) {
    if (lang == this.activeLanguage) {
      return "#1CCB91";
    } else {
      return "white";
    }
  }
}

