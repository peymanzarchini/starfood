export interface ReviewUser {
  id: number;
  firstName: string;
  lastName: string;
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

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface ProductReviewsBody {
  reviews: Review[];
  stats: ReviewStats;
}

export interface CreateReviewInput {
  productId: number;
  rating: number;
  comment?: string;
}

export interface CanReviewResponse {
  canReview: boolean;
  reason?: string;
}
