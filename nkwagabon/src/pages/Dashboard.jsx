// pages/Dashboard.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64">
        <Header />
        <main className="p-6 bg-gray-50 flex-1">
          <Outlet /> {/* Permet de charger les pages dynamiques ici */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
