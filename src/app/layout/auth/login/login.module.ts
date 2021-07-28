import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from 'src/app/layout/auth/login/login-routing.module';
import { LoginComponent } from 'src/app/layout/auth/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule],
})
export class LoginModule {}
