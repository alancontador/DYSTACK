import { Helmet } from "react-helmet";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/contact/ContactForm";
import QuoteForm from "@/components/contact/QuoteForm";

const Contact = () => {
  const [location] = useLocation();
  
  // Check if the URL has a query parameter for quote
  const searchParams = new URLSearchParams(window.location.search);
  const hasProductParam = searchParams.has('product');
  
  const defaultTab = hasProductParam ? "quote" : "contact";

  return (
    <>
      <Helmet>
        <title>Contato | Dystack - Materiais de Construção</title>
        <meta 
          name="description" 
          content="Entre em contato conosco ou solicite um orçamento personalizado. Estamos prontos para atender você e fornecer os melhores materiais para sua obra." 
        />
      </Helmet>

      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contato</h1>
            <p className="text-gray-600">
              Estamos à disposição para ajudar você com o que precisar. Entre em contato ou solicite um orçamento personalizado.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Left column - Contact Info */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Informações de Contato</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary-50 text-primary-700 rounded-full flex items-center justify-center mr-3 mt-1">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">Endereço</h3>
                        <p className="text-gray-600">
                          Av. Exemplo, 1234<br />
                          Bairro - Cidade/UF<br />
                          CEP: 00000-000
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary-50 text-primary-700 rounded-full flex items-center justify-center mr-3 mt-1">
                        <i className="fas fa-phone-alt"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">Telefone</h3>
                        <p className="text-gray-600">
                          <a href="tel:+551199999999" className="hover:text-primary-700">(11) 9999-9999</a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary-50 text-primary-700 rounded-full flex items-center justify-center mr-3 mt-1">
                        <i className="fab fa-whatsapp"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">WhatsApp</h3>
                        <p className="text-gray-600">
                          <a href="https://wa.me/5511999999999" className="hover:text-primary-700">(11) 99999-9999</a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary-50 text-primary-700 rounded-full flex items-center justify-center mr-3 mt-1">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-gray-600">
                          <a href="mailto:contato@dystack.com.br" className="hover:text-primary-700">contato@dystack.com.br</a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary-50 text-primary-700 rounded-full flex items-center justify-center mr-3 mt-1">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div>
                        <h3 className="font-medium">Horário de Funcionamento</h3>
                        <p className="text-gray-600">
                          Segunda a Sexta: 8h às 18h<br />
                          Sábado: 8h às 12h
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Siga-nos</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-primary-50 text-gray-600 hover:text-primary-700 rounded-full flex items-center justify-center transition">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-primary-50 text-gray-600 hover:text-primary-700 rounded-full flex items-center justify-center transition">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-primary-50 text-gray-600 hover:text-primary-700 rounded-full flex items-center justify-center transition">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-primary-50 text-gray-600 hover:text-primary-700 rounded-full flex items-center justify-center transition">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1978263549555!2d-46.65429048502171!3d-23.564611784682837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c2f1ff009f%3A0xd0f1bc6a3c46322!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1618428263928!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="200" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy"
                  className="rounded-lg shadow-sm"
                  title="Mapa de localização da Dystack"
                ></iframe>
              </div>
            </div>
            
            {/* Right column - Forms */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue={defaultTab}>
                    <TabsList className="grid grid-cols-2 mb-6">
                      <TabsTrigger value="contact">Mensagem</TabsTrigger>
                      <TabsTrigger value="quote">Orçamento</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="contact">
                      <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Envie uma Mensagem</h2>
                        <p className="text-gray-600">
                          Tem alguma pergunta, sugestão ou feedback? Preencha o formulário abaixo 
                          e entraremos em contato o mais breve possível.
                        </p>
                      </div>
                      <ContactForm />
                    </TabsContent>
                    
                    <TabsContent value="quote">
                      <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Solicite um Orçamento</h2>
                        <p className="text-gray-600">
                          Precisa de um orçamento personalizado? Preencha o formulário com os detalhes 
                          da sua necessidade e entraremos em contato para discutir seu projeto.
                        </p>
                      </div>
                      <QuoteForm />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
