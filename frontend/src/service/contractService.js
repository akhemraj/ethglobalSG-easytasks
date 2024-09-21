// src/services/contractService.js

import axios from 'axios';
import useWalletStore from '../store/wallet';
import ABI from'../ABI.json';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
const contractService = {
  
  async createTask(publicClient, walletClient,title, description, type, amountInWei) {
    try {
      const account = walletClient.account;
      
      const resHash = await walletClient.writeContract({
        address: '0x093873ae318faef01285ee689aa21e2809f99c3b',
        abi: ABI,
        functionName: 'createTask',
        args: [title, description, type, amountInWei ],
        account,
      })
      console.log("resHash", resHash);

    } catch (error) {
       console.error('Error in createTask:', error);
       throw error;
    }
    
  },

  async submitOffer(publicClient, walletClient, taskId, offeredAmount) {
    try {
      const walletClient = useWalletStore.getState().walletClient; // Access wallet from store
      const publicClient = useWalletStore.getState().publicClient; // Access public client from store
      const account = walletClient.account;
      
      const resHash = await walletClient.writeContract({
        address: '0x093873ae318faef01285ee689aa21e2809f99c3b',
        abi: ABI,
        functionName: 'submitOffer',
        args: [taskId, offeredAmount],
        account,
      })
      return resHash;
    } catch (error) {
       console.error('Error in submitOffer:', error);
       throw error;
    }
  },

  async acceptOffer(publicClient, walletClient, taskId, offerIndex) {
    try {
      const walletClient = useWalletStore.getState().walletClient; // Access wallet from store
      const publicClient = useWalletStore.getState().publicClient; // Access public client from store
      const account = walletClient.account;
      
      const resHash = await walletClient.writeContract({
        address: '0x093873ae318faef01285ee689aa21e2809f99c3b',
        abi: ABI,
        functionName: 'acceptOffer',
        args: [taskId, offerIndex],
        account,
      })
      return resHash;
    } catch (error) {
       console.error('Error in acceptOffer:', error);
       throw error;
    }
  },

  async markTaskAsCompleted(publicClient, walletClient, taskId) {
    try {
      const walletClient = useWalletStore.getState().walletClient; // Access wallet from store
      const publicClient = useWalletStore.getState().publicClient; // Access public client from store
      const account = walletClient.account;
      
      const resHash = await walletClient.writeContract({
        address: '0x093873ae318faef01285ee689aa21e2809f99c3b',
        abi: ABI,
        functionName: 'markTaskAsCompleted',
        args: [taskId],
        account,
      })
      return resHash;
    } catch (error) {
       console.error('Error in markTaskAsCompleted:', error);
       throw error;
    }
  },

  async getAllTaskOffers(publicClient, walletClient, taskId) {
    try {
      const publicClient = useWalletStore.getState().publicClient; // Access public client from store
      const taskOffers = await publicClient.readContract({
        address: '0x093873ae318faef01285ee689aa21e2809f99c3b',
        abi: ABI,
        functionName: 'getAllTaskOffers',
        args: [taskId],
      })
      return taskOffers;
    } catch (error) {
       console.error('Error in getAllTaskOffers:', error);
       throw error;
    }
  },

};

export default contractService;
