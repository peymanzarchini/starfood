// Export components
export { ProductCard } from "./components/ProductCard";
export { ProductList } from "./components/ProductList";

// Export hooks
export { useProducts } from "./hooks/useProduct";
export { useProductDetails } from "./hooks/useProductDetails";

// Export types
export type {
  Product,
  ProductDetail,
  GetProductsQuery,
  CreateProductInput,
  UpdateProductInput,
} from "./types";

// Export API (if needed in admin pages directly)
export { productsApi } from "./services/product.service";
