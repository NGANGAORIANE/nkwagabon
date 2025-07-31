import React from "react";

const TrendingDestinations = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <h3 className="text-lg font-semibold mb-2">Destinations tendance</h3>
      <ul>
        {data.map((item) => (
          <li key={item.nom} className="mb-1 flex justify-between">
            <span>{item.nom}</span>
            <span className="text-green-700 font-bold">{item.visites}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingDestinations;
