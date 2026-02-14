import apiClient from "@/libs/api";
import type { ApiResponse, PaginatedResponse } from "@/types";
import type {
  CreateReviewInput,
  ProductReviewsResponse,
  ReviewWithProduct,
  UpdateReviewInput,
} from "../types";

export const reviewsApi = {
  // Public
  getByProduct: (productId: number, page = 1, limit = 10) =>
    apiClient.get<ApiResponse<ProductReviewsResponse>>(`/products/${productId}/reviews`, {
      params: { page, limit },
    }),

  // User
  getMy: (page = 1, limit = 10) =>
    apiClient.get<ApiResponse<PaginatedResponse<ReviewWithProduct>>>("/reviews/my", {
      params: { page, limit },
    }),

  canReview: (productId: number) =>
    apiClient.get<ApiResponse<{ canReview: boolean; reason?: string }>>(
      `/reviews/can-review/${productId}`,
    ),

  create: (data: CreateReviewInput) =>
    apiClient.post<ApiResponse<ReviewWithProduct>>("/reviews", data),

  update: (id: number, data: UpdateReviewInput) =>
    apiClient.put<ApiResponse<ReviewWithProduct>>(`/reviews/${id}`, data),

  delete: (id: number) => apiClient.delete<ApiResponse<null>>(`/reviews/${id}`),

  // Admin
  admin: {
    getAll: (params?: {
      page?: number;
      limit?: number;
      isApproved?: boolean;
      productId?: number;
      rating?: number;
    }) =>
      apiClient.get<ApiResponse<PaginatedResponse<ReviewWithProduct>>>("/admin/reviews", {
        params,
      }),

    getById: (id: number) => apiClient.get<ApiResponse<ReviewWithProduct>>(`/admin/reviews/${id}`),

    setApproval: (id: number, isApproved: boolean) =>
      apiClient.patch<ApiResponse<ReviewWithProduct>>(`/admin/reviews/${id}/approval`, {
        isApproved,
      }),

    delete: (id: number) => apiClient.delete<ApiResponse<null>>(`/admin/reviews/${id}`),

    getStats: () =>
      apiClient.get<
        ApiResponse<{
          total: number;
          pending: number;
          approved: number;
          averageRating: number;
        }>
      >("/admin/reviews/stats"),

    bulkApprove: (reviewIds: number[]) =>
      apiClient.post<ApiResponse<{ affectedCount: number }>>("/admin/reviews/bulk-approve", {
        reviewIds,
      }),

    bulkDelete: (reviewIds: number[]) =>
      apiClient.post<ApiResponse<{ deletedCount: number }>>("/admin/reviews/bulk-delete", {
        reviewIds,
      }),
  },
};
