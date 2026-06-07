import apiClient from "@/api/client";
import type { ApiResponse } from "@/types";
import type { Address, CreateAddressInput } from "../types";

export const addressesApi = {
  getAll: async (): Promise<Address[]> => {
    const response = await apiClient.get<ApiResponse<Address[]>>("/addresses");
    return response.data.body;
  },
  create: async (data: CreateAddressInput): Promise<Address> => {
    const response = await apiClient.post<ApiResponse<Address>>("/addresses", data);
    return response.data.body;
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/addresses/${id}`);
  },
  setDefault: async (id: number): Promise<Address> => {
    const response = await apiClient.patch<ApiResponse<Address>>(`/addresses/${id}/default`);
    return response.data.body;
  },
};
