export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivering"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderAddress {
  id: number;
  title: string;
  street: string;
  city: string;
  phoneNumber: string;
  fullAddress: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  discountAmount: number;
  deliveryCost: number;
  totalAmount: number;
  notes: string | null;
  estimatedDelivery: string | null;
  items: OrderItem[];
  address: OrderAddress;
  discountCode: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrderList {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  itemCount: number;
  totalAmount: number;
  createdAt: string;
}

export interface CreateOrderInput {
  addressId: number;
  discountCode?: string;
  notes?: string;
}

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
