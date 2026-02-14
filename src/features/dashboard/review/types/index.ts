import type { PaginatedResponse } from "@/types";

export interface ReviewUser {
  id: number;
  firstName: string;
  lastName: string;
}

export interface ReviewProduct {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string | null;
  isApproved: boolean;
  user: ReviewUser;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewWithProduct extends Review {
  product: ReviewProduct;
}

export interface ProductReviewsResponse {
  reviews: Review[];
  pagination: PaginatedResponse<Review>["pagination"];
  stats: {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
  };
}

export interface CreateReviewInput {
  productId: number;
  rating: number;
  comment?: string;
}

export interface UpdateReviewInput {
  rating?: number;
  comment?: string;
}
