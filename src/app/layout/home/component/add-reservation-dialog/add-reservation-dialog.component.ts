import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hotel } from 'src/schema';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-reservation-dialog',
  templateUrl: './add-reservation-dialog.component.html',
  styleUrls: ['./add-reservation-dialog.component.scss'],
})
export class AddReservationDialogComponent implements OnInit {
  addReservationForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Hotel,
    private httpClient: HttpClient,
    private matSnackBar: MatSnackBar
  ) {
    this.addReservationForm = new FormGroup({
      hotel: new FormGroup({
        id: new FormControl(data.id),
      }),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      checkInDate: new FormControl(null, [Validators.required]),
      checkOutDate: new FormControl(null, [Validators.required]),
      guestCount: new FormControl(null, [
        Validators.min(0),
        Validators.max(4),
        Validators.required,
      ]),
    });
  }

  submitReservation(): void {
    if (this.addReservationForm.valid) {
      this.httpClient
        .post(
          'http://localhost:4000/reservation',
          this.addReservationForm.value
        )
        .pipe(
          catchError((err) => {
            console.log(err);
            this.matSnackBar.open(
              'There is already a reservation with this email or phone number',
              'Ok',
              { duration: 4000 }
            );
            return throwError(err);
          })
        )
        .subscribe(() => {
          this.matSnackBar.open('Booked successfully', 'Ok', {
            duration: 4000,
          });
        });
    } else {
      this.matSnackBar.open('Check the form again', 'Ok', { duration: 4000 });
    }
  }

  ngOnInit(): void {}
}
