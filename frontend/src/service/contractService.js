// src/services/apiService.js

import axios from 'axios';
import useWalletStore from '../store/wallet';
import ABI from'../ABI.json';
const contractService = {
  
  async createTask(title, description, type, amountInWei) {
    try {
      const walletClient = useWalletStore.getState().walletClient; // Access wallet from store
      const publicClient = useWalletStore.getState().publicClient; // Access public client from store
      console.log('Wallet Client:', walletClient);
      
      console.log('Public Client:', publicClient);
      const account = walletClient.account;
      
      console.log("account", account);

      const transaction = {
        to: "0xE783ad5904f6aa2664eB6bDDa0e01ec1DD8e9848",
        value: 1,
      };
  
      const hash = await walletClient.sendTransaction(transaction);
      console.log('hash', hash);

      const resHash = await walletClient.writeContract({
        address: '0x093873ae318faef01285ee689aa21e2809f99c3b',
        abi: ABI,
        functionName: 'createTask',
        args: [title, description, type, amountInWei ],
        account,
      })
      console.log("asdas")
      console.log("resHash", resHash);

    } catch (error) {
       console.error('Error in createTask:', error);
       throw error;
    }
    
  },

  async submitOffer(taskId, offeredAmount) {
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

  async acceptOffer(taskId, offerIndex) {
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

  async markTaskAsCompleted(taskId) {
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

  async getAllTaskOffers(taskId) {
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
