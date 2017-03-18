import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    isCollapsed:boolean = false;

    constructor() {
        this.checkSize();
    }

    ngOnInit() {
    }

    checkSize() {
        // Checks the size on window to choose the menu to be collapsed or not.
        if(window.innerWidth > 768) {
            this.isCollapsed = false;
        } else {
            this.isCollapsed = true;
        }
    }

    onResize() {
        this.checkSize();
    }

    onClick() {
        this.isCollapsed = !this.isCollapsed;
    }

}
