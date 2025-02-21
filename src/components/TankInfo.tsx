import { Box } from "lucide-react";
import { TankData } from "../types/TankData";
import { TANK_HEIGHT, TANK_LENGTH, calculateBreath } from "../utils/TankCalculation";

// Define the type for tank items
const tankItems: { name: string; key: keyof TankData }[] = [
  { name: "Bar Screen", key: "BarScreen" },
  { name: "Oil Grease Tank", key: "OilGreaseTank" },
  { name: "Equalization Tank", key: "EqualizationTank" },
  { name: "Anoxic Tank", key: "AnoxicTank" },
  { name: "MBBR Tank", key: "MBBRTank" },
  { name: "Tube Settle", key: "TubeSettle" },
  { name: "Filter Feed Tank", key: "FilterFeedTank" },
  { name: "Treated Water Tank", key: "TreatedWaterTank" },
  { name: "UF Water Tank", key: "UFWaterTank" },
  { name: "Sludge Holding Tank", key: "SludgeHoldingTank" },
];

const TankInfo = ({ tankData }: { tankData: TankData }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Tank Details</h2>
      {tankItems.map(({ name, key }) => {
        const volume = tankData[key] || 0;
        const breath = calculateBreath(volume);

        return (
          <div key={key} className="mb-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Box className="h-5 w-5 text-blue-600" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Volume (m³)</label>
              <input
                type="text"
                value={(volume as number).toFixed(2)}
                readOnly
                className="block w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Breadth (m)</label>
              <input
                type="text"
                value={breath.toFixed(2)}
                readOnly
                className="block w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Length (m)</label>
              <input
                type="text"
                value={TANK_LENGTH.toFixed(2)}
                readOnly
                className="block w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (m)</label>
              <input
                type="text"
                value={TANK_HEIGHT.toFixed(2)}
                readOnly
                className="block w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-700"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TankInfo;