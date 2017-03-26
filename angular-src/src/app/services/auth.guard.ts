import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authenticateService: AuthenticateService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): boolean {
            this.authenticateService.loadTokenAndData();
            
            let roles = route.data["roles"] as Array<String>;
            let userRole = this.authenticateService.user.role == null ? 'logged-out' : this.authenticateService.user.role;

            if (roles.indexOf(userRole) != -1) {
                return true;
            } else if (userRole != 'logged-out') {
                this.router.navigate(['/home']);
                return false;
            } else {
                this.router.navigate(['/']);
                return false;
            }
        }
}