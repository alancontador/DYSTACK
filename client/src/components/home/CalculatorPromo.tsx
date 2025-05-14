import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const CalculatorPromo = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [calculatorType, setCalculatorType] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [calculating, setCalculating] = useState(false);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!calculatorType || !length || !height) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos para calcular.",
        variant: "destructive",
      });
      return;
    }
    
    setCalculating(true);
    
    try {
      // Redirect to the calculators page with the pre-filled values
      navigate(`/calculadoras?type=${calculatorType}&length=${length}&height=${height}`);
    } catch (error) {
      toast({
        title: "Erro ao calcular",
        description: "Ocorreu um erro ao processar o cálculo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setCalculating(false);
    }
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Calculator Image */}
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Calculadora de Materiais" 
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Calculator Form */}
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="uppercase tracking-wide text-sm text-secondary-600 font-semibold">Ferramenta exclusiva</div>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">Calculadora de Materiais</h2>
              <p className="mt-4 text-gray-600">Não sabe quanto material vai precisar para sua obra? Experimente nossa calculadora e obtenha uma estimativa rápida.</p>
              
              <div className="mt-8">
                <form onSubmit={handleCalculate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo de Cálculo</label>
                    <Select value={calculatorType} onValueChange={setCalculatorType}>
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alvenaria">Alvenaria (Tijolos)</SelectItem>
                        <SelectItem value="concreto">Concreto</SelectItem>
                        <SelectItem value="piso-revestimento">Piso e Revestimento</SelectItem>
                        <SelectItem value="pintura">Pintura</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Comprimento (m)</label>
                      <Input 
                        type="number" 
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        step="0.01"
                        min="0.1"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Altura (m)</label>
                      <Input 
                        type="number" 
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        step="0.01"
                        min="0.1"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      className="w-full bg-secondary-600 hover:bg-secondary-700 text-white"
                      disabled={calculating}
                    >
                      {calculating ? "Calculando..." : "Calcular Material"}
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <Link href="/calculadoras">
                    <a className="inline-flex items-center text-primary-700 hover:text-primary-900 font-medium">
                      Ver todas as calculadoras <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorPromo;
