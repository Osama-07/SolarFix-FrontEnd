export interface Technician {
  technicianId: number;
  fullName: string;
  email: string;
  phone: string;
  experienceYears: number;
  pricePerHour: number;
  rating: number;
}
export interface TechnicianRequestDTO {
  technicianId: number;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  userType: boolean;
  experienceYears: number;
  pricePerHour: number;
}
