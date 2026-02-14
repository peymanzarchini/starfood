import apiClient from "@/libs/api";
import type { ApiResponse } from "@/types";
import type { Address, CreateAddressInput, UpdateAddressInput } from "../types";

export const addressesApi = {
  getAll: () => apiClient.get<ApiResponse<Address[]>>("/addresses"),

  getById: (id: number) => apiClient.get<ApiResponse<Address>>(`/addresses/${id}`),

  getDefault: () => apiClient.get<ApiResponse<Address | null>>("/addresses/default"),

  create: (data: CreateAddressInput) => apiClient.post<ApiResponse<Address>>("/addresses", data),

  update: (id: number, data: UpdateAddressInput) =>
    apiClient.put<ApiResponse<Address>>(`/addresses/${id}`, data),

  setDefault: (id: number) => apiClient.patch<ApiResponse<Address>>(`/addresses/${id}/default`),

  delete: (id: number) => apiClient.delete<ApiResponse<null>>(`/addresses/${id}`),
};
