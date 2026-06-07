import apiClient from "@/api/client";
import type { ApiResponse } from "@/types";
import type { ProductReviewsResponse, CreateReviewInput, Review } from "../types";

export const reviewsApi = {
  getByProduct: async (productId: number): Promise<ProductReviewsResponse> => {
    const response = await apiClient.get<ApiResponse<ProductReviewsResponse>>(
      `/products/${productId}/reviews`,
    );
    return response.data.body;
  },

  create: async (data: CreateReviewInput): Promise<Review> => {
    const response = await apiClient.post<ApiResponse<Review>>("/reviews", data);
    return response.data.body;
  },
};
