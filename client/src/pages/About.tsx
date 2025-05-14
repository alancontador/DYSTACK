import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <>
      <Helmet>
        <title>Sobre Nós | Dystack - Materiais de Construção</title>
        <meta 
          name="description" 
          content="Conheça a história da Dystack, nossa missão, valores e compromisso com a qualidade em materiais de construção desde 2005." 
        />
      </Helmet>

      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Sobre a Dystack</h1>
            <p className="text-xl text-gray-600">
              Fornecendo materiais de construção de qualidade desde 2005
            </p>
          </div>

          {/* Our Story */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Nossa História</h2>
              <p className="text-gray-600 mb-4">
                A Dystack nasceu em 2005 do sonho de fornecer materiais de construção com a melhor qualidade, 
                preço justo e atendimento especializado. O que começou como uma pequena loja familiar, cresceu e 
                se tornou referência no setor de materiais de construção na região.
              </p>
              <p className="text-gray-600 mb-4">
                Durante esses anos, participamos de inúmeras construções, desde pequenas reformas até grandes obras,
                sempre mantendo nosso compromisso com a qualidade dos produtos e serviços oferecidos.
              </p>
              <p className="text-gray-600">
                Hoje, contamos com uma equipe especializada, pronta para oferecer as melhores soluções para sua obra,
                do início ao acabamento, mantendo a mesma dedicação e paixão pelo que fazemos desde o primeiro dia.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1541976498248-b3c979782f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Loja Dystack" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>

          {/* Mission, Vision and Values */}
          <div className="bg-white p-8 rounded-lg shadow-sm mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Missão, Visão e Valores</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary-50 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-bullseye text-xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">Missão</h3>
                    <p className="text-gray-600 text-center">
                      Fornecer materiais de construção de qualidade superior com preço justo e atendimento especializado, 
                      contribuindo para o sucesso dos projetos de nossos clientes.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary-50 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-eye text-xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">Visão</h3>
                    <p className="text-gray-600 text-center">
                      Ser reconhecida como a melhor e mais confiável empresa de materiais de construção da região,
                      referência em qualidade de produtos e excelência no atendimento.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary-50 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-heart text-xl"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">Valores</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li className="flex items-baseline">
                        <i className="fas fa-check text-primary-700 mr-2"></i>
                        <span>Compromisso com a qualidade</span>
                      </li>
                      <li className="flex items-baseline">
                        <i className="fas fa-check text-primary-700 mr-2"></i>
                        <span>Transparência e ética</span>
                      </li>
                      <li className="flex items-baseline">
                        <i className="fas fa-check text-primary-700 mr-2"></i>
                        <span>Atendimento personalizado</span>
                      </li>
                      <li className="flex items-baseline">
                        <i className="fas fa-check text-primary-700 mr-2"></i>
                        <span>Responsabilidade socioambiental</span>
                      </li>
                      <li className="flex items-baseline">
                        <i className="fas fa-check text-primary-700 mr-2"></i>
                        <span>Inovação e melhoria contínua</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Our Team */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Nossa Equipe</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Carlos Silva", role: "Fundador & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300" },
                { name: "Ana Oliveira", role: "Gerente de Vendas", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300" },
                { name: "Pedro Santos", role: "Consultor Técnico", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300" },
                { name: "Márcia Lima", role: "Atendimento ao Cliente", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300" },
              ].map((member, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Facilities */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Nossas Instalações</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500" 
                  alt="Showroom Dystack" 
                  className="rounded-lg shadow-md mb-2"
                />
                <p className="text-center font-medium">Showroom</p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500" 
                  alt="Estoque Dystack" 
                  className="rounded-lg shadow-md mb-2"
                />
                <p className="text-center font-medium">Estoque</p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500" 
                  alt="Frota de Entrega Dystack" 
                  className="rounded-lg shadow-md mb-2"
                />
                <p className="text-center font-medium">Frota de Entrega</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary-900 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Vamos construir juntos!</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Estamos prontos para ajudar em seu próximo projeto, seja uma pequena reforma ou uma grande construção.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/contato">
                <a className="bg-white hover:bg-gray-100 text-primary-900 font-medium py-3 px-6 rounded-md">
                  Entre em Contato
                </a>
              </Link>
              <Link href="/produtos">
                <a className="bg-secondary-600 hover:bg-secondary-700 text-white font-medium py-3 px-6 rounded-md">
                  Conheça Nossos Produtos
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
