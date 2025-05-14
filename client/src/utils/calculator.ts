/**
 * Utility functions for material calculations
 */

// Alvenaria (Wall/Masonry) calculations
export function calculateMasonry(length: number, height: number): {
  bricks: number;
  mortar: number;
  area: number;
} {
  const area = length * height;
  const bricksPerM2 = 25; // 25 bricks per square meter (standard 8-hole brick 9x19x19cm)
  const mortarPerM2 = 0.02; // 0.02 cubic meters of mortar per square meter
  
  return {
    bricks: Math.ceil(area * bricksPerM2),
    mortar: parseFloat((area * mortarPerM2).toFixed(2)),
    area: parseFloat(area.toFixed(2))
  };
}

// Concrete calculations
export function calculateConcrete(length: number, width: number, height: number): {
  cement: number;
  sand: number;
  gravel: number;
  volume: number;
} {
  const volume = length * width * height;
  
  // Standard proportions for concrete: 1:2:3 (cement:sand:gravel)
  // 1 cubic meter of concrete requires approximately 350kg of cement
  return {
    cement: Math.ceil(volume * 350), // 350kg of cement per cubic meter
    sand: parseFloat((volume * 0.7).toFixed(2)), // 0.7 cubic meters of sand per cubic meter
    gravel: parseFloat((volume * 0.8).toFixed(2)), // 0.8 cubic meters of gravel per cubic meter
    volume: parseFloat(volume.toFixed(2))
  };
}

// Flooring/Tiling calculations
export function calculateFlooring(length: number, width: number): {
  tiles: number;
  adhesive: number;
  grout: number;
  area: number;
} {
  const area = length * width;
  const tilesPerM2 = 4; // Assuming 50x50cm tiles (4 per square meter)
  const adhesivePerM2 = 4; // 4kg per square meter
  
  return {
    tiles: Math.ceil(area * tilesPerM2 * 1.1), // 10% extra for cuts and waste
    adhesive: Math.ceil(area * adhesivePerM2),
    grout: Math.ceil(area * 0.5), // 0.5kg per square meter
    area: parseFloat(area.toFixed(2))
  };
}

// Painting calculations
export function calculatePainting(length: number, height: number): {
  paint: number;
  primer: number;
  area: number;
} {
  const area = length * height;
  const paintCoveragePerL = 10; // 10 square meters per liter
  const coats = 2; // 2 coats of paint
  
  return {
    paint: Math.ceil((area / paintCoveragePerL) * coats),
    primer: Math.ceil(area / 12), // 12 square meters per liter for primer
    area: parseFloat(area.toFixed(2))
  };
}

// General calculator based on type
export function calculateMaterials(
  calculatorType: string,
  length: number,
  width: number,
  height: number
): any {
  switch (calculatorType) {
    case 'alvenaria':
      return calculateMasonry(length, height);
    case 'concreto':
      return calculateConcrete(length, width, height);
    case 'piso-revestimento':
      return calculateFlooring(length, width);
    case 'pintura':
      return calculatePainting(length, height);
    default:
      throw new Error('Invalid calculator type');
  }
}
