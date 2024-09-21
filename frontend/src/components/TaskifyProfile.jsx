import React, { useState }  from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {EditableInput} from '../ui/EditableInput.js';
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthersExtension } from "@dynamic-labs/ethers-v5";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import axios from 'axios';
const TaskifyProfile = () => {



  const navigate = useNavigate();

  const handleClick = async () => {
    const authToken = localStorage.getItem('dynamic_authentication_token');
    console.log('sending token to backend' , authToken);

    const response = await axios.post('http://localhost:8000/api/signUpOrSignIn',{
      token:  authToken// Send proof in request body
       // Send email in request body
    });
    if (response.status == 200) {
      const data = response.data;
      localStorage.setItem("email", data.email );
      navigate('/verify');
    } else {
      console.log("error occurred while calling api");
    }
    console.log('data from token', response);
    
   
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden font-['Manrope','Noto_Sans',sans-serif]">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7eef3] px-10 py-3">
          <div className="flex items-center gap-4 text-[#0d161b]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-[#0d161b] text-lg font-bold leading-tight tracking-[-0.015em]">EasyTasks</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#0d161b] text-sm font-medium leading-normal" href="#">Home</a>
              <a className="text-[#0d161b] text-sm font-medium leading-normal" href="#">Browse tasks</a>
              <a className="text-[#0d161b] text-sm font-medium leading-normal" href="#">Post a task</a>
              <a className="text-[#0d161b] text-sm font-medium leading-normal" href="#">Earn money</a>
              <a className="text-[#0d161b] text-sm font-medium leading-normal" href="#">Help</a>
              
              <DynamicContextProvider
      settings={{
        environmentId: "ed25802a-53aa-4165-9407-2906d615c0cd",
        walletConnectorExtensions: [EthersExtension],
        walletConnectors: [EthereumWalletConnectors],
        events: {
          onAuthSuccess: async(args) => {
            console.log('onAuthSuccess was called', args);
            const {primaryWallet, user} = args;
            //create contract instance using ethers
            
            const publicClient = await primaryWallet.getPublicClient();
            const walletClient = await primaryWallet.getWalletClient();
            console.log("walletClient", walletClient);

            // you can get the jwt by calling the getAuthToken helper function
          }
        }
      }}
    >
      <DynamicWidget />

    </DynamicContextProvider>
            </div>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <h3 className="text-[#0d161b] tracking-light text-2xl font-bold leading-tight px-4 text-center pb-2 pt-5">Create your profile</h3>
            <h3 className="text-[#0d161b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Your name</h3>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0d161b] text-base font-medium leading-normal pb-2">First name</p>
                <EditableInput/>
              
              </label>
            </div>
            <h3 className="text-[#0d161b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">What's your role?</h3>
            <div className="flex flex-wrap gap-3 p-4">
              <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#cfdee7] px-4 h-11 text-[#0d161b] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#209cee] relative cursor-pointer">
                I need help
                <input type="radio" className="invisible absolute" name="role" />
              </label>
              <label className="text-sm font-medium leading-normal flex items-center justify-center rounded-xl border border-[#cfdee7] px-4 h-11 text-[#0d161b] has-[:checked]:border-[3px] has-[:checked]:px-3.5 has-[:checked]:border-[#209cee] relative cursor-pointer">
                I can help
                <input type="radio" className="invisible absolute" name="role" />
              </label>
            </div>
            <h3 className="text-[#0d161b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Where do you live?</h3>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0d161b] text-base font-medium leading-normal pb-2">Suburb, postcode or city</p>
                <select className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d161b] focus:outline-0 focus:ring-0 border border-[#cfdee7] bg-slate-50 focus:border-[#cfdee7] h-14 placeholder:text-[#4c7b9a] p-[15px] text-base font-normal leading-normal appearance-none">
                  <option value="one"></option>
                  <option value="two">two</option>
                  <option value="three">three</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </label>
            </div>
            <div className="flex px-4 py-3">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#209cee] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
                onClick={handleClick}
              >
                <span className="truncate">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskifyProfile;