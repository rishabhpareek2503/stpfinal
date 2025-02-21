"use client"

import { useState, useEffect } from "react"
import { Box, Hash, IndianRupee } from 'lucide-react'
import type { EquipmentData } from "../types/Equipment"
import type { PlantData } from "../types/PlantData"

interface EquipmentItemProps {
  id: string
  data: EquipmentData
  plantData: PlantData
  onDataChange: (id: string, quantity: number) => void
}

const EquipmentItem = ({ id, data, plantData, onDataChange }: EquipmentItemProps) => {
  const [localQuantity, setLocalQuantity] = useState<string | number>(data.quantity || 0)

  useEffect(() => {
    setLocalQuantity(data.quantity || 0)
  }, [data.quantity])

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const newQuantity = id === "mbbr-media" ? Number.parseFloat(value) : Number.parseInt(value, 10)

    if (value === "") {
      setLocalQuantity("")
      onDataChange(id, 0)
      return
    }

    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setLocalQuantity(newQuantity)
      onDataChange(id, newQuantity)
    }
  }

  const renderPropertyField = (key: string, value: any) => {
    // Only exclude these specific properties from display
    if (["name", "quantity", "totalPrice", "type", "basePrice"].includes(key)) return null
    
    // Format the value based on its type
    let displayValue = value
    if (typeof value === 'number') {
      displayValue = value.toFixed(2)
    } else if (value === undefined || value === null) {
      displayValue = 'N/A'
    }
    
    return (
      <div className="mb-4" key={key}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Box className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={displayValue}
            readOnly
            className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700"
          />
        </div>
      </div>
    )
  }

  // Format the total price with commas and fixed decimal places
  const formattedTotalPrice = data.totalPrice 
    ? data.totalPrice.toLocaleString('en-IN', { 
        maximumFractionDigits: 2,
        minimumFractionDigits: 2 
      })
    : "0.00"

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{data.name}</h3>
        <div className="bg-blue-100 p-2 rounded-lg">
          <Box className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      {Object.entries(data).map(([key, value]) => renderPropertyField(key, value))}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Hash className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="number"
            value={localQuantity}
            onChange={handleQuantityChange}
            min="0"
            step={id === "mbbr-media" ? "0.1" : "1"}
            className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Total Price (₹)</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IndianRupee className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={`₹${formattedTotalPrice}`}
            readOnly
            className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700"
          />
        </div>
      </div>
    </div>
  )
}

export default EquipmentItem