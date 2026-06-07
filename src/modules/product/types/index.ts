export interface ProductImage {
  id: number;
  url: string;
  thumbnailUrl: string | null;
  altText: string | null;
  displayOrder: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  finalPrice: number;
  discount: number;
  discountAmount: number;
  imageUrl: string;
  isAvailable: boolean;
  isPopular: boolean;
  preparationTime: number | null;
  calories: number | null;
  categoryId: number;
}

export interface ProductDetail extends Product {
  ingredients: string[];
  gallery: ProductImage[];
  category: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsQuery {
  page?: number;
  limit?: number;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  isPopular?: boolean;
  isAvailable?: boolean;
  sortBy?: "price" | "createdAt" | "name" | "discount";
  sortOrder?: "asc" | "desc";
}

// Admin Inputs
export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl?: string;
  ingredients?: string[];
  preparationTime?: number;
  calories?: number;
  discount?: number;
  isAvailable?: boolean;
  isPopular?: boolean;
}

export type UpdateProductInput = Partial<CreateProductInput>;
