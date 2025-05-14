import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import ProductGrid from "@/components/products/ProductGrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  return (
    <>
      <Helmet>
        <title>Produtos | Dystack - Materiais de Construção</title>
        <meta 
          name="description" 
          content="Conheça nossa ampla variedade de materiais de construção. Temos tudo o que você precisa para sua obra do começo ao fim." 
        />
      </Helmet>

      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Produtos</h1>
            <p className="text-gray-600 max-w-3xl">
              Disponibilizamos uma ampla variedade de produtos para sua construção ou reforma. 
              Desde materiais básicos até acabamentos, temos tudo o que você precisa com a qualidade Dystack.
            </p>
          </div>

          {/* Categories Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {categories?.slice(0, 3).map((category: any) => (
              <Card key={category.id} className="hover:shadow-md transition">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center mb-2">
                    <i className={`fas ${category.icon} text-xl`}></i>
                  </div>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a 
                    href={`/produtos/categoria/${category.slug}`}
                    className="text-primary-700 hover:text-primary-900 font-medium inline-flex items-center"
                  >
                    Ver Produtos <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Product Grid with all products */}
          <h2 className="text-2xl font-bold mb-6">Todos os Produtos</h2>
          <ProductGrid />
        </div>
      </div>
    </>
  );
};

export default Products;
