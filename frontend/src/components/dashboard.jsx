import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('need-help');

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden font-['Manrope','Noto_Sans',sans-serif]">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <h1 className="text-[#0d161b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-center pb-3 pt-5">
              Dashboard
            </h1>
            <p className="text-[#0d161b] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Welcome to your EasyTasks dashboard!
            </p>
            {/* Add more dashboard content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;