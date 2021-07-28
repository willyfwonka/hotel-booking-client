import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { shareReplay } from 'rxjs/operators';
import { User } from 'src/schema';
import { EMPTY } from 'rxjs';

interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  readonly staticRoutes: NavItem[] = [
    {
      label: 'Home',
      path: '/home',
      icon: 'home',
    },
    {
      label: 'Login',
      path: 'auth/login',
      icon: 'login',
    },
    {
      label: 'Dashboard',
      path: 'dashboard',
      icon: 'dashboard',
    },
  ];
  jwtUser!: User;

  constructor(private authService: AuthService) {
    this.authService
      .getUser()
      .pipe(shareReplay(1))
      .subscribe((data) => {
        this.jwtUser = data;
        return EMPTY;
      });
  }

  showLink(router: NavItem): boolean {
    return !(
      (this.jwtUser && router.label === 'Login') ||
      (!this.jwtUser && router.label === 'Dashboard')
    );
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }
}
