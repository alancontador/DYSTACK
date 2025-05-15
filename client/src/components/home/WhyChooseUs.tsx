const features = [
  {
    icon: "fa-medal",
    title: "Qualidade Garantida",
    description: "Mais de 47.000 clientes satisfeitos com nossos produtos de qualidade superior."
  },
  {
    icon: "fa-truck",
    title: "Entrega Rápida",
    description: "Entregamos em toda a região com agilidade e segurança para sua obra."
  },
  {
    icon: "fa-headset",
    title: "Atendimento Especializado",
    description: "93% de satisfação com nosso atendimento técnico personalizado."
  },
  {
    icon: "fa-boxes",
    title: "Variedade de Produtos",
    description: "Tudo para sua obra em um só lugar, do início ao acabamento."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-primary-900">Por que escolher a Dystack?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
              <div className="w-16 h-16 bg-primary-50 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`fas ${feature.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-900">{feature.title}</h3>
              <p className="text-gray-900">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
