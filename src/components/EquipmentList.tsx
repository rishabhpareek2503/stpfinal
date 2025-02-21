// File: components/EquipmentList.tsx
"use client"

import React from "react";
import { Box } from "lucide-react";
import EquipmentItem from "./EquipmentItem"

interface Equipment {
  id: string;
  name: string;
  quantity: number;
  basePrice: number;
  totalPrice: number;
  type: string;
}

interface EquipmentListProps {
  equipmentData: Record<string, Equipment>;
  plantData: any;
  onDataChange: (id: string, quantity: number) => void;
}

// Define fixed cost components to exclude
const FIXED_COST_COMPONENTS = [
  'commissioning',
  'installation',
  'panel',
  'cable',
  'piping'
];

const EquipmentList: React.FC<EquipmentListProps> = ({
  equipmentData,
  plantData,
  onDataChange,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Equipment Selection</h2>
          <p className="text-gray-500 mt-1">Choose quantities and view calculations for required equipment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(equipmentData)
          // Filter out fixed cost components
          .filter(([id]) => !FIXED_COST_COMPONENTS.includes(id))
          .map(([id, equipment]) => (
            <EquipmentItem
              key={id}
              id={id}
              data={equipment}
              plantData={plantData}
              onDataChange={onDataChange}
            />
          ))}
      </div>
    </div>
  )
}

export default EquipmentList