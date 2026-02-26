import type { ApiResponse } from "@/types";
import apiClient from "../client";

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
