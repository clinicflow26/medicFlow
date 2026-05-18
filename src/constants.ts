import { Doctor, Appointment, DraftBooking, Notification } from './types';

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    specialization: 'Cardiologist',
    rating: 4.8,
    reviews: 120,
    address: 'Heart Clinic, Andheri West, Mumbai',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    experience: '10 Yrs',
    patients: '2.5k+',
    about: 'Dr. Sarah Wilson is a highly experienced cardiologist at Heart Clinic. She specializes in cardiovascular health and interventional cardiology with over 10 years of experience.',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  {
    id: '2',
    name: 'Dr. Robert Fox',
    specialization: 'Dentist',
    rating: 4.9,
    reviews: 85,
    address: 'Dental Pros, Andheri West, Mumbai',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
    experience: '8 Yrs',
    patients: '1.8k+',
    about: 'Dr. Robert Fox is a board-certified dentist specializing in restorative and cosmetic dentistry.',
    availability: ['Mon', 'Wed', 'Fri']
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    specialization: 'Dermatologist',
    rating: 4.7,
    reviews: 95,
    address: 'Dermal Care, Bandra, Mumbai',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200',
    experience: '12 Yrs',
    patients: '3.1k+',
    about: 'Dr. Emily Chen is a leading dermatologist focusing on clinical and cosmetic dermatology.',
    availability: ['Tue', 'Thu', 'Sat']
  },
  {
    id: '4',
    name: 'Dr. Amit Sharma',
    specialization: 'General Physician',
    rating: 4.6,
    reviews: 210,
    address: 'Wellness Clinic, Powai, Mumbai',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    experience: '15 Yrs',
    patients: '5k+',
    about: 'Dr. Amit Sharma is a seasoned general practitioner dedicated to family medicine and chronic disease management.',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  {
    id: '5',
    name: 'Dr. Priya Mehta',
    specialization: 'Pediatrician',
    rating: 4.9,
    reviews: 150,
    address: 'Kids Care Hub, Andheri East, Mumbai',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=200',
    experience: '7 Yrs',
    patients: '2k+',
    about: 'Dr. Priya Mehta is a compassionate pediatrician focused on newborn care and child development.',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  }
];

export const SPECIALISTS = [
  { id: '1', name: 'Dentist', icon: 'fa-tooth' },
  { id: '2', name: 'Dermatologist', icon: 'fa-sparkles' },
  { id: '3', name: 'General Physician', icon: 'fa-user-md' },
  { id: '4', name: 'Pediatrician', icon: 'fa-baby' },
  { id: '5', name: 'Cardiologist', icon: 'fa-heart-pulse' },
  { id: '6', name: 'Orthopedic', icon: 'fa-bone' },
  { id: '7', name: 'Neurologist', icon: 'fa-brain' },
  { id: '8', name: 'Gynecologist', icon: 'fa-venus' },
  { id: '9', name: 'ENT Specialist', icon: 'fa-ear-listen' },
  { id: '10', name: 'Psychiatrist', icon: 'fa-head-side-virus' },
];

export const UPCOMING_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    doctorId: '2',
    doctorName: 'Dr. Robert Fox',
    specialization: 'Orthopedic',
    date: 'Dec 12, 2023',
    time: '10:30 AM',
    status: 'upcoming',
    clinic: 'New York Clinic'
  }
];

export const MOCK_DRAFTS: DraftBooking[] = [
  {
    id: 'd1',
    doctorId: '1',
    doctorName: 'Dr. Sarah Wilson',
    doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    date: 'Dec 15, 2023',
    time: '02:00 PM',
    lastUpdated: '2 hours ago'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    doctorName: 'Dr. Sarah Wilson',
    dateTime: 'Dec 15, 10:00 AM',
    type: 'confirmed',
    status: 'Confirmed Booking'
  },
  {
    id: 'n2',
    doctorName: 'Dr. Robert Fox',
    dateTime: 'Dec 12, 09:30 AM',
    type: 'rescheduled',
    status: 'Rescheduled Appointment'
  },
  {
    id: 'n3',
    doctorName: 'Dr. Emily Chen',
    dateTime: 'Dec 10, 04:00 PM',
    type: 'completed',
    status: 'Completed Appointment'
  }
];
