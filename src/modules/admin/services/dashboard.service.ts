import apiClient from "@/api/client";
import type { ApiResponse } from "@/types";
import type { OrderStats, DiscountStats, ReviewStats } from "../types";

export const dashboardApi = {
  getOrderStats: async (): Promise<OrderStats> => {
    const response = await apiClient.get<ApiResponse<OrderStats>>("/admin/orders/stats");
    return response.data.body;
  },

  getDiscountStats: async (): Promise<DiscountStats> => {
    const response = await apiClient.get<ApiResponse<DiscountStats>>("/admin/discounts/stats");
    return response.data.body;
  },

  getReviewStats: async (): Promise<ReviewStats> => {
    const response = await apiClient.get<ApiResponse<ReviewStats>>("/admin/reviews/stats");
    return response.data.body;
  },
};
