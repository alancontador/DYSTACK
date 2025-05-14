import { Helmet } from "react-helmet";
import { useParams, useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight, Home, ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { postId } = useParams();
  const [, navigate] = useLocation();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: [`/api/blog/${postId}`],
  });
  
  const { data: allPosts } = useQuery({
    queryKey: ["/api/blog"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Artigo não encontrado</h2>
            <p className="text-gray-600 mb-4">O artigo que você está procurando não existe ou foi removido.</p>
            <Button onClick={() => navigate("/blog")}>
              Ver todos os artigos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Format date
  const publishDate = new Date(post.publishDate);
  const formattedDate = formatDistanceToNow(publishDate, { 
    addSuffix: true,
    locale: ptBR 
  });

  // Find previous and next posts
  let prevPost, nextPost;
  
  if (allPosts && allPosts.length > 1) {
    const currentIndex = allPosts.findIndex((p: any) => p.id === post.id);
    
    if (currentIndex > 0) {
      prevPost = allPosts[currentIndex - 1];
    }
    
    if (currentIndex < allPosts.length - 1) {
      nextPost = allPosts[currentIndex + 1];
    }
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Dystack - Materiais de Construção</title>
        <meta 
          name="description" 
          content={post.summary} 
        />
      </Helmet>

      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
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
                    <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                      Blog
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight size={16} />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink className="font-medium">
                    {post.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <article>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              <p className="text-gray-500 mb-6">{formattedDate}</p>
              
              <div className="mb-8">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              <div className="prose prose-lg max-w-none mb-10">
                {/* In a real app, this would render HTML content from a rich text editor */}
                <p className="mb-4">{post.summary}</p>
                <p>{post.content}</p>
              </div>
            </article>

            {/* Post Navigation */}
            <div className="border-t border-gray-200 pt-6 mt-10">
              <div className="flex flex-col sm:flex-row justify-between">
                {prevPost ? (
                  <Link 
                    href={`/blog/${prevPost.slug}`}
                    className="flex items-center text-primary-700 hover:text-primary-900 mb-4 sm:mb-0"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    <span className="font-medium">Artigo Anterior</span>
                  </Link>
                ) : (
                  <div></div>
                )}
                
                {nextPost && (
                  <Link 
                    href={`/blog/${nextPost.slug}`}
                    className="flex items-center text-primary-700 hover:text-primary-900"
                  >
                    <span className="font-medium">Próximo Artigo</span>
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
