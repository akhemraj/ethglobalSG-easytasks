import React from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyIdentity = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden font-['Manrope','Noto_Sans',sans-serif]">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <h1 className="text-[#0d161b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
              Verify your identity to use EasyTasks
            </h1>
            <p className="text-[#0d161b] text-base font-normal leading-normal pb-3 pt-1 px-4">
              EasyTasks is using Worldcoin to verify new users. This is a one-time process that will take 5 minutes.
            </p>
            <div className="flex px-4 py-3">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#209cee] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
                onClick={() => {
                  // Add your verification logic here
                  console.log('Starting verification process');
                  // After verification, you might want to navigate to the next page
                  // navigate('/next-page');
                }}
              >
                <span className="truncate">Get started</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyIdentity;