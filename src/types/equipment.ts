export interface EquipmentData {
    name: string
    capacity?: number
    diameter?: number
    Volume?: number
    size?: number
    quantity: number
    costPerCapacity: number
    costPerDiameter: number
    costPerVolume: number
    costPerPiece: number
    costPerFlow: number
    totalPrice: number
  }
  
  interface Equipment {
    id: string;
    name: string;
    basePrice: number;
    quantity: number;
    totalPrice: number;
    type: string;
    capacity?: number;  // Optional for equipment that needs it
  }
  
  