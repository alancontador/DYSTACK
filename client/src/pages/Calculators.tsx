import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import CalculatorForm from "@/components/calculators/CalculatorForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Calculators = () => {
  const [activeTab, setActiveTab] = useState("calculator");

  const { data: calculatorTypes } = useQuery({
    queryKey: ["/api/calculators"],
  });

  return (
    <>
      <Helmet>
        <title>Calculadoras de Materiais | Dystack - Materiais de Construção</title>
        <meta 
          name="description" 
          content="Calcule a quantidade de materiais necessários para sua obra. Nossas calculadoras ajudam você a planejar melhor e economizar." 
        />
      </Helmet>

      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Calculadoras de Materiais</h1>
            <p className="text-gray-600">
              Planejar adequadamente a quantidade de materiais é essencial para o sucesso e economia na sua obra. 
              Use nossas calculadoras para estimar quanto você vai precisar de cada material.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="calculator">Calculadora</TabsTrigger>
              <TabsTrigger value="guide">Guia de Uso</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator">
              <CalculatorForm />
            </TabsContent>
            
            <TabsContent value="guide">
              <Card>
                <CardHeader>
                  <CardTitle>Como usar nossas calculadoras</CardTitle>
                  <CardDescription>
                    Orientações para obter os melhores resultados ao calcular materiais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Alvenaria (Tijolos)</h3>
                    <p className="text-gray-600 mb-2">
                      Essa calculadora estima a quantidade de tijolos e argamassa necessários para construir paredes.
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 text-sm">
                      <li>Comprimento: Medida horizontal da parede em metros</li>
                      <li>Altura: Altura da parede em metros</li>
                      <li>O cálculo considera tijolos cerâmicos de 8 furos (9x19x19cm)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Concreto</h3>
                    <p className="text-gray-600 mb-2">
                      Essa calculadora estima a quantidade de cimento, areia e brita para preparar concreto.
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 text-sm">
                      <li>Comprimento, Largura e Altura: Dimensões da área em metros</li>
                      <li>O cálculo considera um traço médio de concreto (1:2:3 - cimento:areia:brita)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Piso e Revestimento</h3>
                    <p className="text-gray-600 mb-2">
                      Essa calculadora estima a quantidade de pisos, argamassa e rejunte necessários.
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 text-sm">
                      <li>Comprimento e Largura: Dimensões da área em metros</li>
                      <li>O cálculo considera pisos de 50x50cm e adiciona 10% para recortes</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Pintura</h3>
                    <p className="text-gray-600 mb-2">
                      Essa calculadora estima a quantidade de tinta e primer necessários.
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 text-sm">
                      <li>Comprimento: Medida horizontal da parede em metros</li>
                      <li>Altura: Altura da parede em metros</li>
                      <li>O cálculo considera duas demãos de tinta</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md mt-4">
                    <p className="text-sm text-blue-800">
                      <strong>Importante:</strong> Estas calculadoras fornecem estimativas aproximadas. 
                      Recomendamos sempre consultar um profissional para projetos específicos e adicionar
                      uma margem de segurança (geralmente 10%) para evitar falta de material.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-16 bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Precisa de ajuda com sua obra?</h2>
            <p className="text-gray-600 mb-6">
              Além das calculadoras, oferecemos suporte técnico especializado para ajudar você a planejar 
              sua obra e escolher os materiais mais adequados para cada etapa.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/contato">
                <a className="bg-primary-700 hover:bg-primary-800 text-white font-medium py-2 px-4 rounded-md text-center transition">
                  Falar com um Especialista
                </a>
              </Link>
              <Link href="/produtos">
                <a className="bg-secondary-600 hover:bg-secondary-700 text-white font-medium py-2 px-4 rounded-md text-center transition">
                  Ver Nossos Produtos
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculators;
