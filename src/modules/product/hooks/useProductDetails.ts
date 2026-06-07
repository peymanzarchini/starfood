import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../services/product.service";

export const useProductDetails = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
};
