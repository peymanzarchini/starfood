import type { PaginationMeta } from "@/types";

export const getPagination = (pagination: PaginationMeta) => {
  return {
    hasNextPage: pagination.pageNumber < pagination.totalPages,
    hasPrevPage: pagination.pageNumber > 1,
  };
};
