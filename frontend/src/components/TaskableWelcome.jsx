import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskableWelcome = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('need-help');

  return (
    <div 
      className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
      style={{
        '--radio-dot-svg': "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(32,156,238)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%273%27/%3e%3c/svg%3e')",
        fontFamily: "Manrope, 'Noto Sans', sans-serif"
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:px-4 @[480px]:py-3">
                <div
                  className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-slate-50 @[480px]:rounded-xl min-h-[218px]"
                  style={{backgroundImage: "url('https://cdn.usegalileo.ai/stability/3a4fa6b4-e090-4a48-8d12-ebc0833a4902.png')"}}
                ></div>
              </div>
            </div>
            <h1 className="text-[#0d161b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-center pb-3 pt-5">Welcome to Taskable!</h1>
            <p className="text-[#0d161b] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Taskable is a platform for people to help each other by sharing tasks and earning money. Which of the following best describes you?
            </p>
            <div className="flex flex-col gap-3 p-4">
              <label className="flex items-center gap-4 rounded-xl border border-solid border-[#cfdee7] p-[15px] flex-row-reverse">
                <input
                  type="radio"
                  className="h-5 w-5 border-2 border-[#cfdee7] bg-transparent text-transparent checked:border-[#209cee] checked:bg-[image:var(--radio-dot-svg)] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#209cee]"
                  name="userType"
                  value="need-help"
                  checked={selectedOption === 'need-help'}
                  onChange={() => setSelectedOption('need-help')}
                />
                <div className="flex grow flex-col"><p className="text-[#0d161b] text-sm font-medium leading-normal">I need help with tasks</p></div>
              </label>
              <label className="flex items-center gap-4 rounded-xl border border-solid border-[#cfdee7] p-[15px] flex-row-reverse">
                <input
                  type="radio"
                  className="h-5 w-5 border-2 border-[#cfdee7] bg-transparent text-transparent checked:border-[#209cee] checked:bg-[image:var(--radio-dot-svg)] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#209cee]"
                  name="userType"
                  value="want-to-help"
                  checked={selectedOption === 'want-to-help'}
                  onChange={() => setSelectedOption('want-to-help')}
                />
                <div className="flex grow flex-col"><p className="text-[#0d161b] text-sm font-medium leading-normal">I want to help with tasks</p></div>
              </label>
              <button onClick={() => navigate('/profile')}>Create Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskableWelcome;