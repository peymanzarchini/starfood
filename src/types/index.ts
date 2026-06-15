export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  body: T;
  status: number;
}
export interface ApiPaginatedResponse<T = unknown> {
  success: boolean;
  message: string;
  body: T;
  status: number;
  pageSize: number;
  pageNumber: number;
  totalItems: number;
  totalPages: number;
}
