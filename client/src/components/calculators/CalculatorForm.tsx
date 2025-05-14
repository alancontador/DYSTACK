import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CalculatorResult from "./CalculatorResult";

const CalculatorForm = () => {
  const [location] = useLocation();
  const { toast } = useToast();
  
  // Parse query params if they exist
  const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      type: params.get('type') || '',
      length: params.get('length') || '',
      height: params.get('height') || '',
      width: params.get('width') || '',
    };
  };
  
  const urlParams = getUrlParams();
  
  const [calculatorType, setCalculatorType] = useState(urlParams.type);
  const [length, setLength] = useState(urlParams.length);
  const [width, setWidth] = useState(urlParams.width);
  const [height, setHeight] = useState(urlParams.height);
  const [calculating, setCalculating] = useState(false);
  const [results, setResults] = useState<any>(null);
  
  const { data: calculatorTypes, isLoading } = useQuery({
    queryKey: ["/api/calculators"],
  });
  
  useEffect(() => {
    // If we have URL parameters, automatically calculate
    if (urlParams.type && urlParams.length && (urlParams.height || urlParams.type === 'pintura')) {
      handleCalculate();
    }
  }, []);
  
  const handleCalculate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Validate all required fields are filled
    if (!calculatorType) {
      toast({
        title: "Selecione o tipo de cálculo",
        description: "Por favor, escolha qual tipo de material você deseja calcular.",
        variant: "destructive",
      });
      return;
    }
    
    if (!length) {
      toast({
        title: "Informe o comprimento",
        description: "O comprimento é necessário para o cálculo.",
        variant: "destructive",
      });
      return;
    }
    
    // Width is required for concrete and flooring
    if ((calculatorType === 'concreto' || calculatorType === 'piso-revestimento') && !width) {
      toast({
        title: "Informe a largura",
        description: "A largura é necessária para este tipo de cálculo.",
        variant: "destructive",
      });
      return;
    }
    
    // Height is required for all except painting
    if (calculatorType !== 'pintura' && !height) {
      toast({
        title: "Informe a altura",
        description: "A altura é necessária para este tipo de cálculo.",
        variant: "destructive",
      });
      return;
    }
    
    setCalculating(true);
    
    try {
      // If width is not provided (e.g., for wall calculations), use 1 as default
      const requestWidth = width || "1";
      
      const response = await apiRequest(
        "POST",
        "/api/calculate",
        {
          calculatorType,
          length,
          width: requestWidth,
          height,
        }
      );
      
      const data = await response.json();
      setResults(data.result);
      
      toast({
        title: "Cálculo concluído",
        description: "Os resultados do seu cálculo estão prontos.",
      });
    } catch (error) {
      console.error("Error calculating:", error);
      toast({
        title: "Erro ao calcular",
        description: "Ocorreu um erro ao processar o cálculo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setCalculating(false);
    }
  };
  
  const resetForm = () => {
    setCalculatorType("");
    setLength("");
    setWidth("");
    setHeight("");
    setResults(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Calculadora de Materiais</CardTitle>
        <CardDescription>
          Calcule a quantidade aproximada de materiais para sua obra
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCalculate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Cálculo</label>
            <Select value={calculatorType} onValueChange={setCalculatorType}>
              <SelectTrigger>
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Comprimento (m)</label>
              <Input 
                type="number" 
                value={length}
                onChange={(e) => setLength(e.target.value)}
                step="0.01"
                min="0.1"
                placeholder="Ex: 3.5"
              />
            </div>
            
            {/* Width is needed for concrete and flooring */}
            {(calculatorType === 'concreto' || calculatorType === 'piso-revestimento') && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Largura (m)</label>
                <Input 
                  type="number" 
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  step="0.01"
                  min="0.1"
                  placeholder="Ex: 4.0"
                />
              </div>
            )}
            
            {/* Height is needed for everything except painting */}
            {calculatorType !== 'pintura' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Altura (m)</label>
                <Input 
                  type="number" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  step="0.01"
                  min="0.1"
                  placeholder="Ex: 2.8"
                />
              </div>
            )}
          </div>
          
          <div className="flex space-x-4">
            <Button 
              type="submit" 
              className="w-full md:w-auto"
              disabled={calculating}
            >
              {calculating ? "Calculando..." : "Calcular"}
            </Button>
            
            {results && (
              <Button 
                type="button" 
                variant="outline"
                onClick={resetForm}
                className="w-full md:w-auto"
              >
                Limpar
              </Button>
            )}
          </div>
        </form>
        
        {/* Results Section */}
        {results && (
          <div className="mt-8">
            <CalculatorResult 
              type={calculatorType} 
              results={results}
              dimensions={{
                length: Number(length),
                width: Number(width || 1),
                height: Number(height || 0)
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalculatorForm;
