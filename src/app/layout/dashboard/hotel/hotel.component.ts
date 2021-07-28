import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/schema';
import { API_URL } from 'src/app/constant';
import { catchError, shareReplay } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent implements OnInit {
  hotelSubscription!: Subscription;
  hotel!: Hotel;
  id!: string;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar
  ) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = id;
      this.hotelSubscription = httpClient
        .get<Hotel>(API_URL + 'hotel/' + id)
        .pipe(
          catchError((err) => {
            this.matSnackBar.open(err, 'Ok', { duration: 4000 });
            return throwError(err);
          }),
          shareReplay(1)
        )
        .subscribe((data) => {
          this.hotel = data;
        });
    });
  }

  ngOnInit(): void {}

  submitApprove(id: string): void {
    this.httpClient
      .patch(API_URL + 'reservation/' + id, { approved: true })
      .pipe(
        catchError((err) => {
          this.matSnackBar.open(err, 'Ok', { duration: 4000 });
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.httpClient
          .get<Hotel>(API_URL + 'hotel/' + this.id)
          .pipe(shareReplay(1))
          .subscribe((data) => {
            this.hotel = data;
          });
      });
  }

  submitUndoApprove(id: string): void {
    this.httpClient
      .patch(API_URL + 'reservation/' + id, { approved: false })
      .pipe(
        catchError((err) => {
          this.matSnackBar.open(err, 'Ok', { duration: 4000 });
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.httpClient
          .get<Hotel>(API_URL + 'hotel/' + this.id)
          .pipe(shareReplay(1))
          .subscribe((data) => {
            this.hotel = data;
          });
      });
  }
}
