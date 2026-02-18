import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/features/dashboard/product/services/product.service";
import type { GetProductsQuery } from "@/features/dashboard/product/types";

export const useFoods = (params: GetProductsQuery) => {
  return useQuery({
    queryKey: ["products", "all", params],
    queryFn: () => productsApi.getAll(params),
    placeholderData: (previousData) => previousData, // Keeps UI smooth during page changes
    staleTime: 5 * 60 * 1000,
  });
};
