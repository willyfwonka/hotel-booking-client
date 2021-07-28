export interface Hotel {
  id: bigint;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date;
  name: string;
  reservations: Reservation[];
}

export interface Reservation {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  checkInDate: Date;
  checkOutDate: Date;
  guestCount: number;
  hotel: Hotel;
}

export interface ListHotel {
  items: Hotel[];
  total: number;
}

export interface User {
  username: string;
  password: string;
  reservations: Reservation[];
}
