import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    isCollapsed:boolean = false;
    isMobileCollapsed:boolean = true;

    constructor() {
        this.checkSize();
    }

    ngOnInit() {
    }

    checkSize() {
        // Checks the size on window to choose the menu to be collapsed or not.
        if(window.innerWidth > 768) {
            this.isCollapsed = false;
            this.isMobileCollapsed = true;
        } else {
            this.isCollapsed = this.isMobileCollapsed ? true : false;
        }
    }

    onResize() {
        this.checkSize();
    }

    onClick() {
        this.isMobileCollapsed = !this.isMobileCollapsed;
        this.isCollapsed = !this.isCollapsed;

    }

}