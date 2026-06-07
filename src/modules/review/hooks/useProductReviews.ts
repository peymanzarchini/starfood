import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { reviewsApi } from "../services/review.service";

export const useProductReviews = (productId: number) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => reviewsApi.getByProduct(productId),
    enabled: !!productId,
  });

  const createMutation = useMutation({
    mutationFn: reviewsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      toast.success("Review submitted! Awaiting admin approval.");
    },
  });

  return {
    reviewsData: query.data,
    isLoading: query.isLoading,
    createReview: createMutation.mutate,
    isCreating: createMutation.isPending,
    refetch: query.refetch,
  };
};
