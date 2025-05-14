import { Helmet } from "react-helmet";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ProductDetailsComponent from "@/components/products/ProductDetails";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";

const ProductDetails = () => {
  const { productId } = useParams();
  
  const { data: product, isLoading } = useQuery({
    queryKey: [`/api/products/${productId}`],
  });

  const { data: category } = useQuery({
    queryKey: [`/api/categories/${product?.categoryId}`],
    enabled: !!product?.categoryId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="md:flex md:gap-10">
            <div className="md:w-1/2">
              <div className="bg-gray-200 w-full h-96 rounded"></div>
              <div className="flex mt-4 gap-2">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="h-5 bg-gray-200 rounded w-1/4 mb-3"></div>
              <div className="h-20 bg-gray-200 rounded mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="h-12 bg-gray-200 rounded w-full mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {product && (
        <Helmet>
          <title>{product.name} | Dystack - Materiais de Construção</title>
          <meta 
            name="description" 
            content={product.description.substring(0, 160)} 
          />
        </Helmet>
      )}

      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex">
                    <Home size={16} />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight size={16} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/produtos" className="text-gray-600 hover:text-gray-900">
                    Produtos
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              {category && (
                <>
                  <BreadcrumbSeparator>
                    <ChevronRight size={16} />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={`/produtos/categoria/${category.slug}`} className="text-gray-600 hover:text-gray-900">
                        {category.name}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              
              {product && (
                <>
                  <BreadcrumbSeparator>
                    <ChevronRight size={16} />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="font-medium">
                      {product.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>

          <ProductDetailsComponent productSlug={productId} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
