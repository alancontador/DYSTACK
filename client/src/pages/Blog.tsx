import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import BlogGrid from "@/components/blog/BlogGrid";

const Blog = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["/api/blog"],
  });

  return (
    <>
      <Helmet>
        <title>Blog e Dicas | Dystack - Materiais de Construção</title>
        <meta 
          name="description" 
          content="Dicas, tutoriais e informações úteis para sua construção ou reforma. Aprenda técnicas, conheça materiais e descubra as melhores práticas." 
        />
      </Helmet>

      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog e Dicas para sua Obra</h1>
            <p className="text-gray-600">
              Compartilhamos conhecimento e experiência para ajudar você a realizar sua obra com mais segurança e qualidade.
              Confira nossas dicas, tutoriais e artigos informativos sobre construção civil.
            </p>
          </div>

          <BlogGrid />
        </div>
      </div>
    </>
  );
};

export default Blog;
