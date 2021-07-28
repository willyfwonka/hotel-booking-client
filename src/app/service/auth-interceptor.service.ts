import { Injectable } from '@angular/core'; // imports the class that provides local storage for token
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Interception In Progress'); // Interception Stage
    const token = localStorage.getItem('token'); // This retrieves a token from local storage
    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    }); // This clones HttpRequest and Authorization header with Bearer token added
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
    });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Catching Error Stage
        if (error && error.status === 401) {
          console.log('Unauthorized Exception'); // in case of an error response the error message is displayed
        }

        const err = error.error.message || error.statusText;
        return throwError(err); // any further errors are returned to frontend
      })
    );
  }
}
