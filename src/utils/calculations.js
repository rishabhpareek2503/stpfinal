// Helper function to ensure numbers are valid
const ensureNumber = (value) => {
  return isNaN(value) ? 0 : value;
};

// Calculate flow rate from plant capacity (m³/day to m³/hr)
export const calculateFlowRate = (capacity) => {
  return capacity / 20;
};

// Raw Sewage Transfer Pump cost calculation
export const getRawSewageTotalCost = (flowRate) => {
  if (flowRate >= 8.23) return 21660;
  if (flowRate >= 4.3) return 17521;
  return 15000;
};

// Oil Skimmer has fixed base cost
export const getOilSkimmerCost = () => {
  return 32000;
};

// Blower cost calculation based on capacity
export const getBlowerTotalCost = (blowerCapacity) => {
  if (blowerCapacity >= 100) return 46392;
  if (blowerCapacity >= 80) return 40533;
  if (blowerCapacity >= 40) return 38165;
  if (blowerCapacity >= 30) return 34157;
  if (blowerCapacity >= 12) return 32874;
  return 31081;
};

// Sludge Recirculation Pump cost calculation
export const getSludgeHoldingTankTotalCost = (sludgeHoldingTank) => {
  if (sludgeHoldingTank >= 8.23) return 21660;
  if (sludgeHoldingTank >= 4.3) return 17521;
  return 15000;
};

// Filter Feed Pump cost calculation
export const calculateFilterFeedPumpTotalCost = (filterFeedPumpCapacity) => {
  if (filterFeedPumpCapacity >= 6.4) return 14881;
  if (filterFeedPumpCapacity >= 5.4) return 11340;
  return 9621;
};

// Multi Grade Filter calculations
export const calculateMGFDiameter = (flowRate) => {
  return Math.sqrt(flowRate / 8);
};

export const calculateMGFVolume = (diameter) => {
  return Math.PI * Math.pow(diameter, 2) * 3;
};

export const calculateMGFCost = (diameter) => {
  return 7000 * diameter;
};

// Activated Carbon Filter calculations
export const calculateACFDiameter = (flowRate) => {
  return Math.sqrt(flowRate / 8);
};

export const calculateACFVolume = (diameter) => {
  return Math.PI * Math.pow(diameter, 2) * 3;
};

export const calculateACFCost = (diameter) => {
  return 7000 * diameter;
};

// Tube Deck Media calculations
export const calculateTubeDeckCapacity = (plantCapacity) => {
  return (plantCapacity / 24) * 0.5;
};

export const calculateTubeDeckCost = (capacity) => {
  return 7000 * capacity;
};

// MBBR Media calculations
export const calculateMBBRMediaVolume = (plantCapacity, BOD) => {
  return (plantCapacity * BOD) / (1000 * 0.8);
};

export const calculateMBBRMediaCost = (volume) => {
  return 19000 * volume;
};

// Diffuser calculations
export const calculateDiffuserPieces = (MBBRVolume) => {
  return Math.ceil(MBBRVolume / 2);
};

export const calculateDiffuserCost = (pieces) => {
  return 700 * pieces;
};

// Flow Meter calculations
export const calculateFlowMeterSize = (flowRate) => {
  return Math.sqrt((flowRate * 4) / (3600 * 1.5 * Math.PI)) * 1000;
};

export const calculateFlowMeterCost = (size) => {
  return 23000 * size;
};

// UV System calculations
export const calculateUVCapacity = (plantCapacity) => {
  return plantCapacity / 24;
};

export const calculateUVSystemCost = (capacity) => {
  return 1000 * capacity;
};

// Ozonator calculations
export const calculateOzonatorCapacity = (plantCapacity) => {
  return (plantCapacity / 24) * 0.015;
};

export const calculateOzonatorCost = (capacity) => {
  return 1000 * capacity;
};

// Ultra Filtration calculations
export const calculateUFCapacity = (plantCapacity) => {
  return plantCapacity / 20;
};

export const calculateUFCost = (capacity) => {
  return 1000 * capacity;
};

// Tank volume calculations
export const calculateEquivalentTank = (flowRate) => {
  return flowRate * 8;
};

export const calculateMBBRTankVolume = (BOD, plantCapacity) => {
  return ((BOD / 1000) * plantCapacity * 2.5) / 0.89;
};

export const calculateNitrogenRemoval = (Nitrogen, plantCapacity) => {
  return ((Nitrogen / 1000) * plantCapacity * 4.3) / 0.89;
};

export const calculateSludgeHoldingTank = (plantCapacity, BOD, TSS) => {
  const sludgeHolder = (plantCapacity * (BOD * 0.15 + TSS * 0.6)) / 100000;
  return sludgeHolder * 4;
};

// Update dynamic capacities and costs
export const updateDynamicCapacities = (plantData, equipmentData) => {
  const updatedEquipmentData = { ...equipmentData };
  
  // Basic calculations
  const flowRate = calculateFlowRate(plantData.capacity);
  
  // MGF calculations
  const mgfDiameter = calculateMGFDiameter(flowRate);
  const mgfVolume = calculateMGFVolume(mgfDiameter);
  const mgfCost = calculateMGFCost(mgfDiameter);
  
  // ACF calculations
  const acfDiameter = calculateACFDiameter(flowRate);
  const acfVolume = calculateACFVolume(acfDiameter);
  const acfCost = calculateACFCost(acfDiameter);
  
  // MBBR Media calculations
  const mbbrVolume = calculateMBBRMediaVolume(plantData.capacity, plantData.BOD);
  const mbbrCost = calculateMBBRMediaCost(mbbrVolume);
  
  // Tube Deck calculations
  const tubeDeckCapacity = calculateTubeDeckCapacity(plantData.capacity);
  const tubeDeckCost = calculateTubeDeckCost(tubeDeckCapacity);
  
  // Diffuser calculations
  const diffuserPieces = calculateDiffuserPieces(mbbrVolume);
  const diffuserCost = calculateDiffuserCost(diffuserPieces);
  
  // UV System calculations
  const uvCapacity = calculateUVCapacity(plantData.capacity);
  const uvCost = calculateUVSystemCost(uvCapacity);
  
  // Ozonator calculations
  const ozonatorCapacity = calculateOzonatorCapacity(plantData.capacity);
  const ozonatorCost = calculateOzonatorCost(ozonatorCapacity);
  
  // Ultra Filtration calculations
  const ufCapacity = calculateUFCapacity(plantData.capacity);
  const ufCost = calculateUFCost(ufCapacity);
  
  // Filter Feed Pump calculations
  const filterPumpCapacity = plantData.capacity / 16;
  const filterPumpCost = calculateFilterFeedPumpTotalCost(filterPumpCapacity);

  // Update equipment data with new calculations
  const updates = {
    "raw-sewage": {
      capacity: flowRate,
      basePrice: getRawSewageTotalCost(flowRate)
    },
    "oil-skimmer": {
      basePrice: getOilSkimmerCost()
    },
    "blower": {
      capacity: mbbrVolume * 1.2, // 20% extra capacity for safety
      basePrice: getBlowerTotalCost(mbbrVolume * 1.2)
    },
    "sludge-pump": {
      capacity: calculateSludgeHoldingTank(plantData.capacity, plantData.BOD, plantData.TSS),
      basePrice: getSludgeHoldingTankTotalCost(calculateSludgeHoldingTank(plantData.capacity, plantData.BOD, plantData.TSS))
    },
    "filter-pump": {
      capacity: filterPumpCapacity,
      basePrice: filterPumpCost
    },
    "multi-grade-filter": {
      diameter: mgfDiameter,
      Volume: mgfVolume,
      basePrice: mgfCost
    },
    "activated-carbon-filter": {
      diameter: acfDiameter,
      Volume: acfVolume,
      basePrice: acfCost
    },
    "tube-media": {
      capacity: tubeDeckCapacity,
      basePrice: tubeDeckCost
    },
    "mbbr-media": {
      Volume: mbbrVolume,
      basePrice: mbbrCost
    },
    "diffuser-course": {
      Piece: diffuserPieces,
      basePrice: diffuserCost
    },
    "diffuser-fine": {
      Piece: diffuserPieces,
      basePrice: diffuserCost
    },
    "flow-meter": {
      size: calculateFlowMeterSize(flowRate),
      basePrice: calculateFlowMeterCost(calculateFlowMeterSize(flowRate))
    },
    "uv-system": {
      capacity: uvCapacity,
      basePrice: uvCost
    },
    "ozonator": {
      capacity: ozonatorCapacity,
      basePrice: ozonatorCost
    },
    "ultra-filtration": {
      capacity: ufCapacity,
      basePrice: ufCost
    }
  };

  // Apply updates and recalculate total prices
  Object.entries(updates).forEach(([key, update]) => {
    if (updatedEquipmentData[key]) {
      updatedEquipmentData[key] = {
        ...updatedEquipmentData[key],
        ...update,
        totalPrice: (update.basePrice || updatedEquipmentData[key].basePrice) * 
                   (updatedEquipmentData[key].quantity || 1)
      };
    }
  });

  // Update fixed-price equipment total prices
  const fixedPriceEquipment = ["commissioning", "installation", "panel", "cable", "piping"];
  fixedPriceEquipment.forEach(key => {
    if (updatedEquipmentData[key]) {
      updatedEquipmentData[key].totalPrice = updatedEquipmentData[key].basePrice * 
                                           (updatedEquipmentData[key].quantity || 1);
    }
  });

  return updatedEquipmentData;
};

// Calculate total cost for all equipment
export const calculateTotalCost = (equipmentData) => {
  return Object.values(equipmentData).reduce((total, equipment) => {
    return total + (equipment.totalPrice || 0);
  }, 0);
};