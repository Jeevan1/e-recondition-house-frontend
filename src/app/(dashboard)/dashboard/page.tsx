import Image from "next/image";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="grid-cols-1 rounded-md bg-white p-4 text-center shadow-sm">
        <p className="text-2xl font-bold text-primary">202</p>
        <h1 className="mt-2 font-bold">Vehicles</h1>
      </div>
      <div className="grid-cols-1 rounded-md bg-white p-4 text-center shadow-sm">
        <p className="text-2xl font-bold text-primary">Rs.20,00,000</p>
        <h1 className="mt-2 font-bold">Total Sales</h1>
      </div>
      <div className="grid-cols-1 rounded-md bg-white p-4 text-center shadow-sm">
        <p className="text-2xl font-bold text-primary">22</p>
        <h1 className="mt-2 font-bold">Total Customers</h1>
      </div>
      <div className="grid-cols-1 rounded-md bg-white p-4 text-center shadow-sm">
        <p className="text-2xl font-bold text-primary">20</p>
        <h1 className="mt-2 font-bold">Purchases</h1>
      </div>
    </div>
  );
};

export default DashboardPage;
