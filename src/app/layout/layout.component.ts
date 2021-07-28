import { Component, OnInit } from '@angular/core';

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
  ];
  constructor() {}

  ngOnInit(): void {}
}
