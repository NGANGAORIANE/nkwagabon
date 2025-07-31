import React from "react";

const StatsCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? '↑' : '↓'} {change}%
      </p>
    </div>
  );
};

export default StatsCard;
