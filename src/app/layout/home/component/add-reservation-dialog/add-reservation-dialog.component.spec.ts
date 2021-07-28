import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservationDialogComponent } from 'src/app/layout/home/component/add-reservation-dialog/add-reservation-dialog.component';

describe('AddReservationDialogComponent', () => {
  let component: AddReservationDialogComponent;
  let fixture: ComponentFixture<AddReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddReservationDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
