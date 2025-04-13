export interface ReviewRequestDTO {
  reviewId: number;
  orderId: number;
  rating: number;
  comment: string;
}

export interface ReviewDTO {
  reviewId: number;
  orderId: number;
  rating: number;
  comment: string;
  createdAt: Date;
}
