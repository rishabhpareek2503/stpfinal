// File: components/PlantInfo.tsx
"use client";

import React from "react";
import { Box } from "lucide-react";
import { PlantData } from '../types/PlantData';

interface PlantInfoProps {
  plantData: PlantData;
  onDataChange: (newData: Partial<PlantData>) => void;
}

const PlantInfo: React.FC<PlantInfoProps> = ({ plantData, onDataChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update the entire plantData object
    onDataChange({
      ...plantData,
      [name]: value === '' ? null : Number(value)
    });
  };

  const inputStyle = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400" +
    " focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" +
    " hover:border-sky-400 transition-colors duration-200";

  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  const inputGroupStyle = "bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow";

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-xl p-6 border border-gray-200">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">STP Plant</h1>
          <span className="px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
            Sewage Treatment Plant
          </span>
        </div>
        <div className="h-1 w-20 bg-blue-600 rounded"></div>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Plant Parameters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={inputGroupStyle}>
          <label className={labelStyle}>
            <span className="text-blue-600">⚡</span> Capacity (CMD)
          </label>
          <input
            type="number"
            name="capacity"
            value={plantData.capacity ?? ''}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter capacity..."
          />
        </div>
        <div className={inputGroupStyle}>
          <label className={labelStyle}>
            <span className="text-green-600">🧪</span> BOD (mg/l)
          </label>
          <input
            type="number"
            name="BOD"
            value={plantData.BOD ?? ''}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter BOD..."
          />
        </div>
        <div className={inputGroupStyle}>
          <label className={labelStyle}>
            <span className="text-purple-600">⚗️</span> COD (mg/l)
          </label>
          <input
            type="number"
            name="COD"
            value={plantData.COD ?? ''}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter COD..."
          />
        </div>
        <div className={inputGroupStyle}>
          <label className={labelStyle}>
            <span className="text-amber-600">💧</span> TSS (mg/l)
          </label>
          <input
            type="number"
            name="TSS"
            value={plantData.TSS ?? ''}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter TSS..."
          />
        </div>
        <div className={inputGroupStyle}>
          <label className={labelStyle}>
            <span className="text-red-600">📊</span> pH
          </label>
          <input
            type="number"
            name="pH"
            value={plantData.pH ?? ''}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter pH..."
          />
        </div>
        <div className={inputGroupStyle}>
          <label className={labelStyle}>
            <span className="text-yellow-600">🛢️</span> Oil & Grease (mg/l)
          </label>
          <input
            type="number"
            name="OilGrease"
            value={plantData.OilGrease ?? ''}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter oil & grease..."
          />
        </div>
        <div className={inputGroupStyle}>
          <label className={labelStyle}>
            <span className="text-cyan-600">🌱</span> Nitrogen (mg/l)
          </label>
          <input
            type="number"
            name="Nitrogen"
            value={plantData.Nitrogen ?? ''}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter nitrogen..."
          />
        </div>
        <div className={inputGroupStyle}>
          <label className={labelStyle}>
            <span className="text-indigo-600">📈</span> Peak Flow Factor
          </label>
          <input
            type="number"
            name="PeakFlow"
            value={plantData.PeakFlow ?? ''}
            onChange={handleInputChange}
            className={inputStyle}
            placeholder="Enter peak flow..."
          />
        </div>
      </div>
    </div>
  );
};

export default PlantInfo;