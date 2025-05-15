import { Link } from "wouter";

const CTASection = () => {
  return (
    <section className="py-16 bg-primary-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Pronto para iniciar ou continuar sua obra?</h2>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white">Conte com a Dystack para fornecer os melhores materiais com atendimento especializado para o seu projeto.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            href="/contato"
            className="bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-3 px-8 rounded-md text-center transition shadow-md"
          >
            Solicitar Orçamento
          </Link>
          <a 
            href="https://wa.me/5511999999999" 
            className="bg-white hover:bg-gray-100 text-accent-700 font-bold py-3 px-8 rounded-md text-center transition shadow-md"
          >
            Falar com um Especialista
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
