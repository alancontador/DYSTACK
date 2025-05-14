import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductDetailsProps {
  productSlug: string;
}

const ProductDetails = ({ productSlug }: ProductDetailsProps) => {
  const [, navigate] = useLocation();
  const [activeImage, setActiveImage] = useState(0);

  const { data: product, isLoading, error } = useQuery({
    queryKey: [`/api/products/${productSlug}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="md:flex md:gap-10 animate-pulse">
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
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Produto não encontrado</h2>
            <p className="text-gray-600 mb-4">Não foi possível encontrar informações sobre este produto.</p>
            <Button onClick={() => navigate("/produtos")}>
              Ver todos os produtos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // In a real app, we would have multiple images, but for now we'll just use the same image
  const productImages = [product.imageUrl, product.imageUrl, product.imageUrl];
  
  // Convert specifications object to array for rendering
  const specifications = product.specifications 
    ? Object.entries(product.specifications).map(([key, value]) => ({ key, value }))
    : [];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="md:flex md:gap-10">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <img 
              src={productImages[activeImage]} 
              alt={product.name} 
              className="w-full h-96 object-cover object-center"
            />
          </div>
          <div className="flex mt-4 gap-2">
            {productImages.map((img, i) => (
              <div 
                key={i} 
                className={`w-20 h-20 border rounded-md overflow-hidden cursor-pointer ${activeImage === i ? 'border-primary-700' : 'border-gray-200'}`}
                onClick={() => setActiveImage(i)}
              >
                <img src={img} alt={`${product.name} - imagem ${i+1}`} className="w-full h-full object-cover object-center" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex justify-between items-center mb-6">
            <div className={`text-sm ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} py-1 px-3 rounded-full inline-block`}>
              {product.inStock ? 'Em estoque' : 'Indisponível'}
            </div>
            {/* Optionally add share buttons or other actions here */}
          </div>
          
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="text-2xl font-bold text-primary-900 mb-6">
            {product.price}
          </div>
          
          <div className="flex space-x-4 mb-8">
            <Link href={`/contato?product=${product.id}`}>
              <Button className="bg-primary-700 hover:bg-primary-800 text-white py-2 px-8">
                Solicitar Orçamento
              </Button>
            </Link>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50 flex items-center">
                <i className="fab fa-whatsapp text-green-500 mr-2"></i> Consultar
              </Button>
            </a>
          </div>
          
          {/* Tabs for additional information */}
          <Tabs defaultValue="specs" className="mt-8">
            <TabsList>
              <TabsTrigger value="specs">Especificações</TabsTrigger>
              <TabsTrigger value="delivery">Entrega</TabsTrigger>
              <TabsTrigger value="warranty">Garantia</TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="pt-4">
              {specifications.length > 0 ? (
                <div className="border rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {specifications.map((spec, index) => (
                        <tr key={index}>
                          <td className="px-6 py-3 text-left text-sm font-medium text-gray-500">{spec.key.charAt(0).toUpperCase() + spec.key.slice(1)}</td>
                          <td className="px-6 py-3 text-left text-sm text-gray-900">{spec.value as string}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">Sem especificações disponíveis para este produto.</p>
              )}
            </TabsContent>
            <TabsContent value="delivery" className="pt-4">
              <div className="prose max-w-none">
                <p>Entregamos em toda a região. Entre em contato para verificar disponibilidade e prazos para sua localidade.</p>
                <ul>
                  <li>Frete calculado com base na distância e volume</li>
                  <li>Tempo médio de entrega: 1-3 dias úteis</li>
                  <li>Entregas agendadas para sua comodidade</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="warranty" className="pt-4">
              <div className="prose max-w-none">
                <p>Todos os produtos da Dystack possuem garantia contra defeitos de fabricação conforme especificações do fabricante.</p>
                <p>Para acionamento da garantia, é necessário apresentar a nota fiscal de compra.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
