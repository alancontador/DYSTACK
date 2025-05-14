import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BlogGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["/api/blog"],
  });
  
  // Filter posts based on search term
  const filteredPosts = posts?.filter(
    (post: any) => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 max-w-md mx-auto">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-16 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-10 text-red-500">
          Erro ao carregar artigos do blog
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="Pesquisar artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Button 
            type="button"
            size="sm"
            variant="ghost"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setSearchTerm("")}
            disabled={!searchTerm}
          >
            {searchTerm ? <i className="fas fa-times"></i> : <i className="fas fa-search"></i>}
          </Button>
        </div>
      </div>
      
      {/* Blog Posts Grid */}
      {filteredPosts?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Nenhum artigo encontrado para "{searchTerm}"
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts?.map((post: any) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogGrid;
