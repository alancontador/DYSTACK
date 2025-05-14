import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ProductGridProps {
  categorySlug?: string;
}

const ProductGrid = ({ categorySlug }: ProductGridProps) => {
  const [sortBy, setSortBy] = useState("featured");
  
  // Determine the API endpoint based on whether a category slug is provided
  const queryKey = categorySlug 
    ? [`/api/products/category/${categorySlug}`]
    : ["/api/products"];
  
  const { data: products, isLoading, error } = useQuery({
    queryKey,
  });
  
  // Sort function based on selected option
  const sortProducts = (products: any[] = []) => {
    switch (sortBy) {
      case "name-asc":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      // Add more sorting options as needed
      default:
        return products; // Default/featured - no sorting
    }
  };
  
  const sortedProducts = sortProducts(products);

  if (isLoading) {
    return (
      <div className="mt-6">
        <div className="flex justify-end mb-4">
          <div className="w-48 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-pulse">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="flex justify-between items-center mb-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">Erro ao carregar produtos</div>;
  }

  if (sortedProducts?.length === 0) {
    return <div className="text-gray-500 text-center py-10">Nenhum produto encontrado</div>;
  }

  return (
    <div className="mt-6">
      <div className="flex justify-end mb-4">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Destaques</SelectItem>
            <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
            <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
