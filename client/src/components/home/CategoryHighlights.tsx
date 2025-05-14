import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

const CategoryHighlights = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Categorias em Destaque</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center text-center animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Categorias em Destaque</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories?.map((category: any) => (
            <Link 
              key={category.id} 
              href={`/produtos/categoria/${category.slug}`}
              className="group"
            >
              <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center text-center transition transform group-hover:bg-gray-200 group-hover:shadow-md">
                <div className="w-16 h-16 flex items-center justify-center mb-3 text-primary-700">
                  <i className={`fas ${category.icon} text-3xl`}></i>
                </div>
                <h3 className="font-medium text-gray-800">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
