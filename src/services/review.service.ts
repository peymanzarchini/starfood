import apiClient from "@/libs/api";
import type {
  CreateReviewInput,
  ProductReviewsResponse,
  ReviewWithProduct,
} from "../features/dashboard/review/types";
import type { ApiResponse, PaginatedResponse } from "@/types";

export const reviewsApi = {
  // --- Public ---
  getByProduct: async (
    productId: number,
    page = 1,
    limit = 10,
  ): Promise<ProductReviewsResponse> => {
    const response = await apiClient.get<ApiResponse<ProductReviewsResponse>>(
      `/products/${productId}/reviews`,
      { params: { page, limit } },
    );
    return response.data.body;
  },

  // --- User ---
  getMyReviews: async (page = 1, limit = 10): Promise<PaginatedResponse<ReviewWithProduct>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<ReviewWithProduct>>>(
      "/reviews/my",
      {
        params: { page, limit },
      },
    );
    return response.data.body;
  },

  checkCanReview: async (productId: number): Promise<{ canReview: boolean; reason?: string }> => {
    const response = await apiClient.get<ApiResponse<{ canReview: boolean; reason?: string }>>(
      `/reviews/can-review/${productId}`,
    );
    return response.data.body;
  },

  create: async (data: CreateReviewInput): Promise<ReviewWithProduct> => {
    const response = await apiClient.post<ApiResponse<ReviewWithProduct>>("/reviews", data);
    return response.data.body;
  },

  // --- Admin ---
  admin: {
    getAll: async (params?: {
      isApproved?: boolean;
      rating?: number;
      page?: number;
    }): Promise<PaginatedResponse<ReviewWithProduct>> => {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<ReviewWithProduct>>>(
        "/admin/reviews",
        { params },
      );
      return response.data.body;
    },

    setApproval: async (id: number, isApproved: boolean): Promise<ReviewWithProduct> => {
      const response = await apiClient.patch<ApiResponse<ReviewWithProduct>>(
        `/admin/reviews/${id}/approval`,
        { isApproved },
      );
      return response.data.body;
    },

    getStats: async (): Promise<{
      total: number;
      pending: number;
      approved: number;
      averageRating: number;
    }> => {
      const response =
        await apiClient.get<
          ApiResponse<{ total: number; pending: number; approved: number; averageRating: number }>
        >("/admin/reviews/stats");
      return response.data.body;
    },

    bulkDelete: async (reviewIds: number[]): Promise<void> => {
      await apiClient.post<ApiResponse<null>>("/admin/reviews/bulk-delete", { reviewIds });
    },
  },
};
