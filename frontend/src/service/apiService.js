// src/services/apiService.js

import axios from 'axios';
import useWalletStore from '../store/wallet';

const apiService = {
  async signInUser() {
    const walletClient = useWalletStore.getState().walletClient; // Access wallet from store
    const publicClient = useWalletStore.getState().publicClient; // Access public client from store
    
    console.log('Wallet Client:', walletClient);
    console.log('Public Client:', publicClient);

    // Example API call with wallet client info
    // try {
    //   const response = await axios.post('http://localhost:8000/api/signUpOrSignIn', {
    //     token,
    //     walletAddress: walletClient?.address // Use wallet client address if available
    //   });
      
      return {};
    // } catch (error) {
    //   console.error('Error signing in:', error);
    //   throw error;
    // }
  }
};

export default apiService;
