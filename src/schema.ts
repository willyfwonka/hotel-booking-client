export interface Hotel {
  id: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date;
  name: string;
  reservations: any;
}

export interface Reservation {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  checkInDate: Date;
  checkOutDate: Date;
  guestCount: number;
  hotel: Hotel;
  approved: boolean;
  changedBy: User;
}

export interface ListHotel {
  items: Hotel[];
  total: number;
}

export interface ListReservation {
  items: Reservation[];
  total: number;
}

export interface User {
  username: string;
  password: string;
  reservations: Reservation[];
}
