import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

const Footer = () => {
  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">DYSTACK</h3>
            <p className="mb-4">Fornecendo materiais de construção de qualidade desde 2005. Sua parceira confiável do início ao fim da sua obra.</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-youtube"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/produtos" className="hover:text-white transition">Produtos</Link></li>
              <li><Link href="/calculadoras" className="hover:text-white transition">Calculadoras</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog e Dicas</Link></li>
              <li><Link href="/sobre" className="hover:text-white transition">Sobre Nós</Link></li>
              <li><a href="#" className="hover:text-white transition">Trabalhe Conosco</a></li>
              <li><a href="#" className="hover:text-white transition">Política de Privacidade</a></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Categorias</h4>
            <ul className="space-y-2">
              {categories?.map((category: any) => (
                <li key={category.id}>
                  <Link 
                    href={`/produtos/categoria/${category.slug}`} 
                    className="hover:text-white transition"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-secondary-500"></i>
                <span>Av. Exemplo, 1234<br />Bairro - Cidade/UF<br />CEP: 00000-000</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-secondary-500"></i>
                <a href="tel:+551199999999" className="hover:text-white">(11) 9999-9999</a>
              </li>
              <li className="flex items-center">
                <i className="fab fa-whatsapp mr-3 text-secondary-500"></i>
                <a href="https://wa.me/5511999999999" className="hover:text-white">(11) 99999-9999</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-secondary-500"></i>
                <a href="mailto:contato@dystack.com.br" className="hover:text-white">contato@dystack.com.br</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock mr-3 text-secondary-500"></i>
                <span>Seg-Sex: 8h-18h | Sáb: 8h-12h</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Dystack Materiais de Construção. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
