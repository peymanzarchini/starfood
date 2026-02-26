import type {
  Address,
  CreateAddressInput,
  UpdateAddressInput,
} from "@/features/dashboard/address/types";
import type { ApiResponse } from "@/types";
import apiClient from "../client";

export const addressesApi = {
  getAll: async (): Promise<Address[]> => {
    const response = await apiClient.get<ApiResponse<Address[]>>("/addresses");
    return response.data.body;
  },

  create: async (data: CreateAddressInput): Promise<Address> => {
    const response = await apiClient.post<ApiResponse<Address>>("/addresses", data);
    return response.data.body;
  },

  update: async (id: number, data: UpdateAddressInput): Promise<Address> => {
    const response = await apiClient.put<ApiResponse<Address>>(`/addresses/${id}`, data);
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
