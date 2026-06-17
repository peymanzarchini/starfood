import type { OrderStatus } from "@/modules/order";

export interface OrderStats {
  total: number;
  pending: number;
  confirmed: number;
  preparing: number;
  delivering: number;
  delivered: number;
  cancelled: number;
  todayOrders: number;
  todayRevenue: number;
}

export interface OrderStatusInfo {
  key: OrderStatus;
  label: string;
  color: string;
  nextStatuses: { key: OrderStatus; label: string }[];
}

export interface DiscountStats {
  total: number;
  active: number;
  expired: number;
  exhausted: number;
  totalUsed: number;
}

export interface ReviewStats {
  total: number;
  pending: number;
  approved: number;
  averageRating: number;
}

export interface Discount {
  id: number;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount: number;
  maxDiscountAmount: number | null;
  usageLimit: number;
  usedCount: number;
  startDate: string;
  expireDate: string;
  isActive: boolean;
  isValid: boolean;
}

export interface CreateDiscountInput {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number | null;
  usageLimit?: number;
  startDate?: string;
  expireDate: string;
  isActive?: boolean;
}
