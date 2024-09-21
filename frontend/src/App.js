import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthersExtension } from "@dynamic-labs/ethers-v5";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

import TaskableWelcome from "./components/TaskableWelcome";
import TaskifyProfile from "./components/TaskifyProfile";
import VerifyIdentity from "./components/VerifyIdentity";
import Dashboard from "./components/dashboard";

export default function App() {
  return (
    <>
      {/* <DynamicProvider /> */}
      <Router>
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

                // Logging to ensure correct wallet data
                console.log("Wallet Client: ", walletClient);
                console.log("Public Client: ", publicClient);

                // you can get the jwt by calling the getAuthToken helper function
              },
            },
          }}
        >
          <Routes>
            <Route path="/" element={<TaskableWelcome />} />
            <Route path="/profile" element={<TaskifyProfile />} />
            <Route path="/verify" element={<VerifyIdentity />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </DynamicContextProvider>
      </Router>
      ;
    </>
  );
}
