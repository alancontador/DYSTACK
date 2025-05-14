import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    description: string;
    categoryId: number;
    imageUrl: string;
    price: string;
    inStock: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <Link 
        href={`/produtos/${product.slug}`}
        className="block"
      >
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
      </Link>
      <CardContent className="p-4">
        <Link 
          href={`/produtos/${product.slug}`}
          className="block"
        >
          <h3 className="text-lg font-semibold mb-2 hover:text-primary-700">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-500">
            {/* Category name would ideally be passed here or looked up */}
          </span>
          <span className={`text-sm ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} py-1 px-2 rounded`}>
            {product.inStock ? 'Em estoque' : 'Indisponível'}
          </span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-primary-900 font-bold">{product.price}</span>
          <Link href={`/contato?product=${product.id}`}>
            <Button 
              className="bg-primary-700 hover:bg-primary-800 text-white py-2 px-4 rounded-md text-sm"
            >
              Orçamento
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
