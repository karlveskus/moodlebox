import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-sub-menu',
  templateUrl: './admin-sub-menu.component.html',
  styleUrls: ['./admin-sub-menu.component.scss']
})
export class AdminSubMenuComponent implements OnInit {
  @Output() toggleParentMenu: EventEmitter<any> = new EventEmitter();

  constructor() { 
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.toggleParentMenu.emit(null);
  }
}
