import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/features/dashboard/product/services/product.service";

export const useFoodDetails = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
};
