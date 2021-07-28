import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d).{8,}$/u),
    ]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  submitLogin(): void {
    const { username, password } = this.loginForm.value;
    this.authService
      .login(username, password)
      .pipe(
        catchError((err) => {
          this.matSnackBar.open(err, 'Ok', {
            duration: 4000,
          });
          throw throwError(err);
        })
      )
      .subscribe(({ token }) => {
        this.matSnackBar.open('Login successful', 'Ok', {
          duration: 4000,
        });
        localStorage.setItem('token', token);
        this.router.navigateByUrl('/').then(() => {
          window.location.reload();
        });
      });
  }

  navigateToRegister(): void {
    this.router.navigateByUrl('auth/register');
  }
}
