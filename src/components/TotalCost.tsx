"use client";

import type React from "react"
import { IndianRupee } from "lucide-react"
import dynamic from "next/dynamic"

const PDFDownloadButton = dynamic(() => import("./PDFDownloadButton"), {
  ssr: false,
  loading: () => <p>Loading PDF generator...</p>,
})

// Define fixed cost components
const FIXED_COSTS = {
  commissioning: 70000,
  installation: 40000,
  panel: 70000,
  cable: 35000,
  piping: 80000
};

interface TotalCostProps {
  totalCost: number
  userData: any
  plantData: any
  equipmentData: any
  tankData: any
}

const TotalCost: React.FC<TotalCostProps> = ({ totalCost, userData, plantData, equipmentData, tankData }) => {
  // Calculate total including fixed costs
  const totalWithFixedCosts = Object.values(FIXED_COSTS).reduce((sum, cost) => sum + cost, totalCost);

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Total Cost Summary</h2>
        <PDFDownloadButton
          userData={userData}
          plantData={plantData}
          equipmentData={equipmentData}
          tankData={tankData}
          totalCost={totalWithFixedCosts}
        />
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-lg font-medium text-gray-600">Total Equipment Cost</p>
            <p className="text-sm text-gray-500">Including all selected items and fixed costs</p>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-600 p-3 rounded-lg mr-4">
              <IndianRupee className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">₹{totalWithFixedCosts.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Amount</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Display fixed costs breakdown */}
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Fixed Costs Breakdown</h3>
        {Object.entries(FIXED_COSTS).map(([name, cost]) => (
          <div key={name} className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 capitalize">{name.replace(/-/g, ' ')}</span>
            <span className="text-gray-800 font-medium">₹{cost.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TotalCost

