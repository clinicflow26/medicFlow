export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviews: number;
  address: string;
  clinic?: string;
  image: string;
  experience: string;
  patients: string;
  about: string;
  availability: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  clinic: string;
}

export interface DraftBooking {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorImage: string;
  date: string;
  time: string;
  lastUpdated: string;
}

export interface Notification {
  id: string;
  doctorName: string;
  dateTime: string;
  type: 'confirmed' | 'completed' | 'pending' | 'rescheduled';
  status: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  photo: string;
}
