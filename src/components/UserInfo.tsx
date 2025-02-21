// File: components/UserInfo.tsx
"use client";

import React from "react";
import { User } from "lucide-react";

interface UserData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface UserInfoProps {
  userData: UserData;
  onDataChange: (newData: Partial<UserData>) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ userData, onDataChange }) => {
  const handleInputChange = (field: keyof UserData, value: string) => {
    onDataChange({ [field]: value });
  };

  const fields = [
    { name: "Name", key: "name" },
    { name: "Email", key: "email" },
    { name: "Phone", key: "phone" },
    { name: "Company", key: "company" },
  ] as const;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ name, key }) => (
          <div
            key={key}
            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <input
              type="text"
              value={userData[key]}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className="block w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter ${name.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
