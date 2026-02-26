import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/api/services/product.service";

export const useHomeProducts = (categoryId: number | null) => {
  return useQuery({
    queryKey: ["products", "home", categoryId],
    queryFn: () =>
      productsApi.getAll({
        categoryId: categoryId || undefined,
        limit: 12, // Show top 12 products
        isAvailable: true,
      }),
    staleTime: 5 * 60 * 1000,
  });
};
