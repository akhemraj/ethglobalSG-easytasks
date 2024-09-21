import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthersExtension } from "@dynamic-labs/ethers-v5";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import useWalletStore from "./store/wallet.jsx";

import TaskableWelcome from "./components/TaskableWelcome";
import TaskifyProfile from "./components/TaskifyProfile";
import VerifyIdentity from "./components/VerifyIdentity";
import Dashboard from "./components/dashboard";

// Menubar component
function MenuBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div>
        <Link to="/" style={{ marginRight: "20px" }}>
          Home
        </Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}

export default function App() {
  const setWalletClient = useWalletStore((state) => {
    console.log("state: ", state);
    return state.setWalletClient;
  });
  const setPublicClient = useWalletStore((state) => state.setPublicClient);

  return (
    <>
      <DynamicContextProvider
        settings={{
          environmentId: "ed25802a-53aa-4165-9407-2906d615c0cd",
          walletConnectorExtensions: [EthersExtension],
          walletConnectors: [EthereumWalletConnectors],
          events: {
            onAuthSuccess: async (args) => {
              // console.log('onAuthSuccess was called', args);
              const { primaryWallet, user } = args;
              //create contract instance using ethers

              const publicClient = await primaryWallet.getPublicClient();
              const walletClient = await primaryWallet.getWalletClient();
              // console.log(setWalletClient, " < set wakket client");
              setWalletClient(walletClient); // Check if this actually sets the wallet correctly
              setPublicClient(publicClient);

              // Logging to ensure correct wallet data
              console.log("Wallet Client: ", walletClient);
              console.log("Public Client: ", publicClient);

              // you can get the jwt by calling the getAuthToken helper function
            },
          },
        }}
      >
        <DynamicWidget />
        <Router>
          {/* Render the MenuBar */}
          {/* <MenuBar /> */}

          <Routes>
            <Route path="/" element={<TaskableWelcome />} />
            <Route path="/profile" element={<TaskifyProfile />} />
            <Route path="/verify" element={<VerifyIdentity />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </DynamicContextProvider>
    </>
  );
}
