import { useQuery } from "@tanstack/react-query";
import type { GetProductsQuery } from "../types";
import { productsApi } from "../services/product.service";

export const useProducts = (params: GetProductsQuery) => {
  return useQuery({
    queryKey: ["products", "list", params],
    queryFn: () => productsApi.getAll(params),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
  });
};
