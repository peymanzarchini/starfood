export interface CartProduct {
  id: number;
  name: string;
  price: number;
  finalPrice: number;
  discount: number;
  imageUrl: string;
  isAvailable: boolean;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: CartProduct;
  itemTotal: number;
}

export interface Cart {
  id: number | null;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  totalDiscount: number;
  total: number;
}

export interface AddToCartInput {
  productId: number;
  quantity?: number;
}

export interface UpdateCartItemInput {
  quantity: number;
}

export interface DiscountInfo {
  code: string;
  type: "percentage" | "fixed";
  value: number;
}

export interface PreviewDiscountResponse {
  isValid: boolean;
  cart: Cart;
  discount: DiscountInfo;
  subtotal: number;
  discountAmount: number;
  deliveryCost: number;
  totalAfterDiscount: number;
  message: string;
}
