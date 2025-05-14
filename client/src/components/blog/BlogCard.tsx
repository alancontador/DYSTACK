import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";

interface BlogCardProps {
  post: {
    id: number;
    title: string;
    slug: string;
    summary: string;
    imageUrl: string;
    publishDate: string;
  };
}

const BlogCard = ({ post }: BlogCardProps) => {
  // Format date
  const publishDate = new Date(post.publishDate);
  const formattedDate = formatDistanceToNow(publishDate, { 
    addSuffix: true,
    locale: ptBR 
  });

  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-sm">
      <Link 
        href={`/blog/${post.slug}`}
        className="block"
      >
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      </Link>
      <CardContent className="p-6">
        <div className="text-sm text-gray-500 mb-2">{formattedDate}</div>
        <Link 
          href={`/blog/${post.slug}`}
          className="block"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-700">{post.title}</h3>
        </Link>
        <p className="text-gray-900 mb-4">{post.summary}</p>
        <Link 
          href={`/blog/${post.slug}`}
          className="text-primary-700 hover:text-primary-900 font-medium inline-flex items-center"
        >
          Ler mais <i className="fas fa-arrow-right ml-2"></i>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
