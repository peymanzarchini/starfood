import apiClient from "@/api/client";
import type { ApiResponse, ApiPaginatedResponse } from "@/types";
import type { ProductReviewsBody, CreateReviewInput, Review, CanReviewResponse } from "../types";

export const reviewsApi = {
  getByProduct: async (
    productId: number,
    page = 1,
    limit = 10,
  ): Promise<ApiPaginatedResponse<ProductReviewsBody>> => {
    const response = await apiClient.get<ApiPaginatedResponse<ProductReviewsBody>>(
      `/products/${productId}/reviews`,
      { params: { page, limit } },
    );
    return response.data;
  },

  canReview: async (productId: number): Promise<CanReviewResponse> => {
    const response = await apiClient.get<ApiResponse<CanReviewResponse>>(
      `/reviews/can-review/${productId}`,
    );
    return response.data.body;
  },

  create: async (data: CreateReviewInput): Promise<Review> => {
    const response = await apiClient.post<ApiResponse<Review>>("/reviews", data);
    return response.data.body;
  },
};
