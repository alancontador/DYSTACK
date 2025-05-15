import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="hidden md:block bg-primary-900 text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm">
            <a href="tel:+551199999999" className="flex items-center text-white hover:text-secondary-500 transition font-medium">
              <i className="fas fa-phone mr-2"></i> (11) 9999-9999
            </a>
            <a href="https://wa.me/5511999999999" className="flex items-center text-white hover:text-secondary-500 transition font-medium">
              <i className="fab fa-whatsapp mr-2"></i> WhatsApp
            </a>
            <span className="flex items-center text-white">
              <i className="far fa-clock mr-2"></i> Seg-Sex: 8h-18h | Sáb: 8h-12h
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <a href="#" className="text-white hover:text-secondary-500 transition"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white hover:text-secondary-500 transition"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-white hover:text-secondary-500 transition"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-primary-900">DYSTACK</div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl px-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="O que você procura? Ex: Cimento, Tijolos, Ferramentas..."
                className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-700"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/produtos" className={`font-medium ${location === '/produtos' ? 'text-primary-700' : 'text-gray-800 hover:text-primary-700'}`}>Produtos</Link>
            <Link href="/calculadoras" className={`font-medium ${location === '/calculadoras' ? 'text-primary-700' : 'text-gray-800 hover:text-primary-700'}`}>Calculadoras</Link>
            <Link href="/blog" className={`font-medium ${location === '/blog' ? 'text-primary-700' : 'text-gray-800 hover:text-primary-700'}`}>Blog</Link>
            <Link href="/sobre" className={`font-medium ${location === '/sobre' ? 'text-primary-700' : 'text-gray-800 hover:text-primary-700'}`}>Sobre</Link>
            <Link href="/contato" className={`font-medium ${location === '/contato' ? 'text-primary-700' : 'text-gray-800 hover:text-primary-700'}`}>Contato</Link>
            <Link href="/contato" className="flex items-center bg-secondary-600 hover:bg-secondary-700 text-white font-medium py-1.5 px-3 rounded-md">
              <i className="far fa-file-alt mr-1"></i> Orçamento
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full pt-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xl font-bold text-primary-900">DYSTACK</div>
                </div>
                <nav className="flex flex-col space-y-4">
                  <Link href="/" className="font-medium text-gray-800 hover:text-primary-700 py-2">Home</Link>
                  <Link href="/produtos" className="font-medium text-gray-800 hover:text-primary-700 py-2">Produtos</Link>
                  <Link href="/calculadoras" className="font-medium text-gray-800 hover:text-primary-700 py-2">Calculadoras</Link>
                  <Link href="/blog" className="font-medium text-gray-800 hover:text-primary-700 py-2">Blog</Link>
                  <Link href="/sobre" className="font-medium text-gray-800 hover:text-primary-700 py-2">Sobre</Link>
                  <Link href="/contato" className="font-medium text-gray-800 hover:text-primary-700 py-2">Contato</Link>
                  <Link href="/contato" className="font-medium text-white bg-secondary-600 hover:bg-secondary-700 py-2 px-3 rounded-md flex items-center font-bold">
                    <i className="far fa-file-alt mr-2"></i> Solicitar Orçamento
                  </Link>
                </nav>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col space-y-2 text-sm">
                    <a href="tel:+551199999999" className="flex items-center text-gray-800 hover:text-primary-700 font-medium">
                      <i className="fas fa-phone mr-2"></i> (11) 9999-9999
                    </a>
                    <a href="https://wa.me/5511999999999" className="flex items-center text-gray-800 hover:text-primary-700 font-medium">
                      <i className="fab fa-whatsapp mr-2"></i> WhatsApp
                    </a>
                    <div className="flex items-center text-gray-800 font-medium">
                      <i className="far fa-clock mr-2"></i> Seg-Sex: 8h-18h | Sáb: 8h-12h
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <a href="#" className="text-gray-800 hover:text-primary-700"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="text-gray-800 hover:text-primary-700"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="text-gray-800 hover:text-primary-700"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Search Bar - Mobile */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Pesquisar produtos..."
              className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-700"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="hidden md:block bg-gray-100 border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <Link href="/produtos" className="py-2 px-4 text-sm font-medium text-gray-700 hover:bg-white hover:text-primary-700 transition-colors">
              Todos os Produtos
            </Link>
            {categories?.map((category: any) => (
              <Link 
                key={category.id} 
                href={`/produtos/categoria/${category.slug}`} 
                className="py-2 px-4 text-sm font-medium text-gray-700 hover:bg-white hover:text-primary-700 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
