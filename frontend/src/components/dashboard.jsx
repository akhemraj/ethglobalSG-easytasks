import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("need-help");

  return (
    <Layout>
      <div className="relative flex size-md min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden font-['Manrope','Noto_Sans',sans-serif]">
        <div className="layout-container flex h-full grow flex-col items-center">
          <h2 class="text-lg font-semibold my-3">Browse Tasks</h2>
          <div class="flex mb-4">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
              Create Task
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
