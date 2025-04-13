export interface OrderRequestDTO {
  orderId: number;
  technicianId: number;
  customerId: number;
}

export interface OrderDetailsDTO {
  orderId: number;
  technicianId: number;
  technicianName: string;
  experienceYears: number;
  pricePerHour: number;
  technicianEmail: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  status: string;
  isRated: boolean;
  createdAt: Date;
}
