import Container from "@/components/ui/Container";
import ProductCard from "./ProductCard";
import { useHomeProducts } from "@/features/home/hooks/useProducts";
import LoadingSpinner from "@/components/ui/Loading";

interface ProductListProps {
  selectedCategory: number | null;
}

const ProductList = ({ selectedCategory }: ProductListProps) => {
  const { data, isLoading, isError } = useHomeProducts(selectedCategory);

  if (isError)
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Failed to load products. Please try again.
      </div>
    );

  return (
    <section className="py-16 bg-bg-page dark:bg-dark-bg-page">
      <Container>
        {/* Skeleton Loading */}
        {isLoading ? (
          <LoadingSpinner />
        ) : data?.items.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-text-muted text-center">
              No products found in this category.
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductList;
