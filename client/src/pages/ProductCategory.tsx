import { Helmet } from "react-helmet";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ProductGrid from "@/components/products/ProductGrid";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Home } from "lucide-react";

const ProductCategory = () => {
  const { categoryId } = useParams();
  
  const { data: category, isLoading: categoryLoading, error: categoryError } = useQuery({
    queryKey: [`/api/categories/${categoryId}`],
  });

  if (categoryLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg h-64 shadow-sm"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (categoryError || !category) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Categoria não encontrada</h2>
            <p className="text-gray-600 mb-4">A categoria que você está procurando não existe ou foi removida.</p>
            <Link href="/produtos">
              <a className="text-primary-700 hover:text-primary-900 font-medium">
                Ver todas as categorias
              </a>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{category.name} | Dystack - Materiais de Construção</title>
        <meta 
          name="description" 
          content={`Conheça nossa linha completa de ${category.name.toLowerCase()}. ${category.description || 'Produtos de alta qualidade com entrega rápida.'}`} 
        />
      </Helmet>

      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">
                    <a><Home size={16} /></a>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight size={16} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/produtos">
                    <a>Produtos</a>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight size={16} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="font-medium">
                  {category.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-10">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center mr-4">
                <i className={`fas ${category.icon} text-xl`}></i>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
            </div>
            {category.description && (
              <p className="text-gray-600 max-w-3xl">
                {category.description}
              </p>
            )}
          </div>

          {/* Product Grid for the specific category */}
          <ProductGrid categorySlug={categoryId} />
        </div>
      </div>
    </>
  );
};

export default ProductCategory;
