import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../services/dashboard.service";

export const useAdminStats = () => {
  const orderStatsQuery = useQuery({
    queryKey: ["admin", "stats", "orders"],
    queryFn: dashboardApi.getOrderStats,
  });

  const discountStatsQuery = useQuery({
    queryKey: ["admin", "stats", "discounts"],
    queryFn: dashboardApi.getDiscountStats,
  });

  const reviewStatsQuery = useQuery({
    queryKey: ["admin", "stats", "reviews"],
    queryFn: dashboardApi.getReviewStats,
  });

  return {
    orderStats: orderStatsQuery.data,
    discountStats: discountStatsQuery.data,
    reviewStats: reviewStatsQuery.data,
    isLoading:
      orderStatsQuery.isLoading || discountStatsQuery.isLoading || reviewStatsQuery.isLoading,
  };
};
