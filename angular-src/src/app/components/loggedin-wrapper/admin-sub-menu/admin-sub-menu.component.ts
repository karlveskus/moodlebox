import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sub-menu',
  templateUrl: './admin-sub-menu.component.html',
  styleUrls: ['./admin-sub-menu.component.scss']
})
export class AdminSubMenuComponent implements OnInit {

  isMobileView:boolean = true;

  constructor() { 
    this.checkSize();
  }

  ngOnInit() {
  }

  checkSize() {
    // Checks the size on window to choose the menu to be collapsed or not.
    if(window.innerWidth > 768) {
      this.isMobileView = false;
    } else {
      this.isMobileView = true;
    }
  }
}
