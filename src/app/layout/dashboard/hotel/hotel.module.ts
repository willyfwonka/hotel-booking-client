import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelRoutingModule } from './hotel-routing.module';
import { HotelComponent } from './hotel.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HotelComponent],
  imports: [
    CommonModule,
    HotelRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
  ],
})
export class HotelModule {}
