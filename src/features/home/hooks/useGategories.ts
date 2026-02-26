import { categoriesApi } from "@/api/services/category.service";
import { useQuery } from "@tanstack/react-query";

export const useActiveCategories = () => {
  return useQuery({
    queryKey: ["categories", "active"],
    queryFn: categoriesApi.getActive,
    staleTime: 10 * 60 * 1000, //10min
  });
};
