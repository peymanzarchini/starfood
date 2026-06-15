import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { reviewsApi } from "../services/review.service";
import { useAuth } from "@/modules/auth";

export const useProductReviews = (productId: number) => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => reviewsApi.getByProduct(productId),
    enabled: !!productId,
  });

  const canReviewQuery = useQuery({
    queryKey: ["can-review", productId],
    queryFn: () => reviewsApi.canReview(productId),
    enabled: isAuthenticated && !!productId,
  });

  const createMutation = useMutation({
    mutationFn: reviewsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      queryClient.invalidateQueries({ queryKey: ["can-review", productId] });
      toast.success("Review submitted! Awaiting admin approval.");
    },
  });

  return {
    reviewsData: query.data,
    canReview: canReviewQuery.data?.canReview ?? false,
    isCheckingReview: canReviewQuery.isLoading,
    isLoading: query.isLoading,
    createReview: createMutation.mutate,
    isCreating: createMutation.isPending,
    refetch: query.refetch,
  };
};
