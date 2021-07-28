import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel, ListHotel } from 'src/schema';
import {
  debounceTime,
  distinctUntilChanged,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddReservationDialogComponent } from 'src/app/layout/home/component/add-reservation-dialog/add-reservation-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  hotelList!: ListHotel;

  filterForm = new FormGroup({
    searchString: new FormControl('', [Validators.minLength(3)]),
    direction: new FormControl('ASC', [Validators.required]),
  });

  constructor(private httpClient: HttpClient, private matDialog: MatDialog) {
    this.subscription = httpClient
      .get<ListHotel>('http://localhost:4000/hotel/list?pageIndex=0&pageSize=5')
      .pipe(shareReplay(1))
      .subscribe((data) => {
        this.hotelList = data;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openDialog(data: Hotel): void {
    this.matDialog.open(AddReservationDialogComponent, {
      data,
      autoFocus: false,
    });
  }

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(async ({ searchString, direction }) => {
          this.subscription = this.httpClient
            .get<ListHotel>(
              'http://localhost:4000/hotel/list?direction=' +
                direction +
                '&query=' +
                searchString
            )
            .subscribe((data) => {
              this.hotelList = data;
            });
        })
      )
      .subscribe();
  }

  updatePagination({ pageIndex, pageSize }: PageEvent): void {
    this.subscription = this.httpClient
      .get<ListHotel>(
        'http://localhost:4000/hotel/list?direction=' +
          this.filterForm.get('direction')?.value +
          '&query=' +
          this.filterForm.get('searchString')?.value +
          '&pageIndex=' +
          pageIndex +
          '&pageSize=' +
          pageSize
      )
      .pipe(shareReplay(1))
      .subscribe((data) => {
        this.hotelList = data;
      });
  }

  onPageChange($event: PageEvent): void {
    this.updatePagination($event);
  }
}
