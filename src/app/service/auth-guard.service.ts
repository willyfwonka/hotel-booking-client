import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    return await this.authService.isAuthenticated().then((canActivate) => {
      if (!canActivate) {
        this.router.navigateByUrl('auth/login');
      }
      return canActivate;
    });
  }
}
