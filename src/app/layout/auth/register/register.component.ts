import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MustMatch } from './validator/must-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: [MustMatch('password', 'confirmPassword')] }
  );

  constructor(
    private authService: AuthService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  submitRegistration(): any {
    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.value)
        .pipe(
          catchError((err) => {
            this.matSnackBar.open(err, 'Ok', { duration: 4000 });
            return throwError(err);
          })
        )
        .subscribe(() => {
          this.router.navigateByUrl('auth/login');
        });
    }
  }

  ngOnInit(): void {}
}
