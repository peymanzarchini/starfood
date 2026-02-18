import apiClient from "@/libs/api";
import type { ApiResponse } from "@/types";

export interface ValidateDiscountResponse {
  isValid: boolean;
  calculatedDiscount: number;
  message: string;
}

export const discountApi = {
  validate: async (code: string, orderAmount: number): Promise<ValidateDiscountResponse> => {
    const response = await apiClient.post<ApiResponse<ValidateDiscountResponse>>(
      "/discounts/validate",
      {
        code,
        orderAmount,
      },
    );
    return response.data.body;
  },
};
