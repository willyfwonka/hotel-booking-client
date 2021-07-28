import { Component, OnInit } from '@angular/core';
import { ListHotel } from 'src/schema';
import { API_URL } from 'src/app/constant';
import { shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  hotelSubscription: Subscription;
  hotelList!: ListHotel;

  constructor(private httpClient: HttpClient) {
    this.hotelSubscription = httpClient
      .get<ListHotel>(API_URL + 'hotel/list?pageIndex=0&pageSize=50')
      .pipe(shareReplay(1))
      .subscribe((data) => {
        this.hotelList = data;
      });

    this.hotelSubscription = httpClient
      .get<ListHotel>(API_URL + 'hotel/list?pageIndex=0&pageSize=50')
      .pipe(shareReplay(1))
      .subscribe((data) => {
        this.hotelList = data;
      });
  }

  ngOnInit(): void {}
}
