import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_URL } from 'src/app/constant';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private httpClient: HttpClient,
    private jwtService: JwtHelperService
  ) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(API_URL + 'auth/login', {
        username,
        password,
      })
      .pipe(shareReplay(1));
  }

  getUser(): Observable<any> {
    return this.httpClient
      .get<any>(API_URL + 'hotel/list?pageIndex=0&pageSize=5')
      .pipe(
        map((data) => {
          let jwtUser;
          const tokenExists = localStorage.getItem('token');
          if (data.items[0]?.reservations && null != tokenExists) {
            jwtUser = this.jwtService.decodeToken(
              this.jwtService.tokenGetter()
            );
            return jwtUser;
          }
          return null;
        }),
        shareReplay(1)
      );
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.getUser()
      .toPromise()
      .then((data) => {
        return null != data;
      });
  }

  register({ username, password, confirmPassword }: any): Observable<any> {
    return this.httpClient.post(API_URL + 'user', {
      username,
      password,
      confirmPassword,
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }
}
