import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ["/api/testimonials"],
  });

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center mb-4 text-accent-400">
        {[...Array(5)].map((_, i) => (
          <i key={i} className={`fas ${i < rating ? 'fa-star' : i === Math.floor(rating) && rating % 1 !== 0 ? 'fa-star-half-alt' : 'fa-star'}`}></i>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">O que nossos clientes dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">O que nossos clientes dizem</h2>
          <div className="text-center text-red-500">Erro ao carregar depoimentos</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">O que nossos clientes dizem</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials?.map((testimonial: any) => (
            <Card key={testimonial.id} className="bg-gray-50">
              <CardContent className="p-6">
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-900 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
