import { reviewsApi } from "@/api/services/review.service";
import { useQuery } from "@tanstack/react-query";

export const useProductReviews = (productId: number) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => reviewsApi.getByProduct(productId),
    enabled: !!productId,
  });
};
