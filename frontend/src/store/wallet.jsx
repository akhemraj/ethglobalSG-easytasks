import { create } from 'zustand';

const useWalletStore = create((set, get) => ({
  walletClient: null,
  publicClient: null,
  
  // Function to set the wallet client
  setWalletClient: (walletClient) => {
    console.log("setting wallet : ", walletClient);
    return set({ walletClient })
},
  
  // Function to set the public client
  setPublicClient: (publicClient) => set({ publicClient }),
  
  // Getter function to retrieve the wallet client
  getWallet: () => {
    return get().walletClient;
  },
  
  // Getter function to retrieve the public client
  getPublicClient: () => {
    return get().publicClient;
  }
}));

export default useWalletStore;
