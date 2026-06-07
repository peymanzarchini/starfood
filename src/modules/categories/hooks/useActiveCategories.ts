import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../services/category.service";

export const useActiveCategories = () => {
  return useQuery({
    queryKey: ["categories", "active"],
    queryFn: categoriesApi.getActive,
    staleTime: 10 * 60 * 1000,
  });
};
