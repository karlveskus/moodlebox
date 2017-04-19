import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    isCollapsed:boolean = false;
    isMobileCollapsed:boolean = true;
    isAdminSubMenuCollapsed: boolean = true;

    constructor(private authenticateService : AuthenticateService) {
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

    toggleMenu() {
        this.isMobileCollapsed = !this.isMobileCollapsed;
        this.isCollapsed = !this.isCollapsed;
    }

    onLogoutClick() {
        this.authenticateService.logout();
    }

    isAdmin() {
        return this.authenticateService.isAdmin();
    }

    isMobileView() {
        return window.innerWidth < 768;
    }

    toggleAdminSubMenu() {
        this.isAdminSubMenuCollapsed = !this.isAdminSubMenuCollapsed;
    }

}