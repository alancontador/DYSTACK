import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section 
      className="relative h-[500px] bg-center bg-cover" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Dystack: Qualidade e Agilidade para sua Construção</h1>
            <p className="text-xl md:text-2xl mb-8">Entrega rápida, variedade de produtos e o melhor atendimento para o seu projeto.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/produtos" className="bg-secondary-600 hover:bg-secondary-700 text-white font-medium py-3 px-6 rounded-md text-center transition shadow-md">
                Conheça Nossos Produtos
              </Link>
              <Link href="/contato" className="bg-white hover:bg-gray-100 text-accent-700 font-bold py-3 px-6 rounded-md text-center transition shadow-md">
                Solicite um Orçamento
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
