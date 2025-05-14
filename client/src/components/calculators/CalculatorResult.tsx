import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CalculatorResultProps {
  type: string;
  results: any;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

const CalculatorResult = ({ type, results, dimensions }: CalculatorResultProps) => {
  let title = "";
  let description = "";
  
  switch (type) {
    case 'alvenaria':
      title = "Resultado: Alvenaria";
      description = "Materiais necessários para construção de parede";
      break;
    case 'concreto':
      title = "Resultado: Concreto";
      description = "Materiais necessários para preparo de concreto";
      break;
    case 'piso-revestimento':
      title = "Resultado: Piso e Revestimento";
      description = "Materiais necessários para assentamento de piso";
      break;
    case 'pintura':
      title = "Resultado: Pintura";
      description = "Materiais necessários para pintura";
      break;
    default:
      title = "Resultado";
      description = "Materiais necessários";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="font-medium">Dimensões informadas:</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>Comprimento: <span className="font-semibold">{dimensions.length} m</span></div>
              {dimensions.width > 0 && (
                <div>Largura: <span className="font-semibold">{dimensions.width} m</span></div>
              )}
              {dimensions.height > 0 && (
                <div>Altura: <span className="font-semibold">{dimensions.height} m</span></div>
              )}
              {results.area && (
                <div>Área total: <span className="font-semibold">{results.area} m²</span></div>
              )}
              {results.volume && (
                <div>Volume total: <span className="font-semibold">{results.volume} m³</span></div>
              )}
            </div>
          </div>
          
          <div className="mt-4 border-t pt-4">
            <h3 className="font-semibold text-lg mb-3">Materiais necessários:</h3>
            
            {type === 'alvenaria' && (
              <ul className="space-y-2">
                <li className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span>Tijolos:</span>
                  <span className="font-bold">{results.bricks} unidades</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Argamassa:</span>
                  <span className="font-bold">{results.mortar} m³</span>
                </li>
              </ul>
            )}
            
            {type === 'concreto' && (
              <ul className="space-y-2">
                <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Cimento:</span>
                  <span className="font-bold">{results.cement} kg</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                  <span>Areia:</span>
                  <span className="font-bold">{results.sand} m³</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Brita:</span>
                  <span className="font-bold">{results.gravel} m³</span>
                </li>
              </ul>
            )}
            
            {type === 'piso-revestimento' && (
              <ul className="space-y-2">
                <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Pisos/Revestimentos:</span>
                  <span className="font-bold">{results.tiles} unidades</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span>Argamassa Colante:</span>
                  <span className="font-bold">{results.adhesive} kg</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Rejunte:</span>
                  <span className="font-bold">{results.grout} kg</span>
                </li>
              </ul>
            )}
            
            {type === 'pintura' && (
              <ul className="space-y-2">
                <li className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span>Tinta (2 demãos):</span>
                  <span className="font-bold">{results.paint} litros</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Selador/Primer:</span>
                  <span className="font-bold">{results.primer} litros</span>
                </li>
              </ul>
            )}
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>* Valores aproximados. Consulte um profissional para projetos específicos.</p>
            <p>* Recomenda-se adicionar 10% para contemplar perdas.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalculatorResult;
