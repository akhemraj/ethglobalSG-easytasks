// import {
//   DynamicContextProvider,
//   DynamicWidget,
// } from "@dynamic-labs/sdk-react-core";
// import { EthersExtension } from "@dynamic-labs/ethers-v5";
// import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
// import TaskableWelcome from './components/TaskableWelcome'; 

// export default function App() {
//   return (
//     <DynamicContextProvider
//       settings={{
//         // Find your environment id at https://app.dynamic.xyz/dashboard/developer
//         environmentId: "ed25802a-53aa-4165-9407-2906d615c0cd",
//         walletConnectorExtensions: [EthersExtension],
//         walletConnectors: [EthereumWalletConnectors],
//       }}
//     >
      
//       <DynamicWidget />
//       <TaskableWelcome /> 
//     </DynamicContextProvider>
//   );
// };

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthersExtension } from "@dynamic-labs/ethers-v5";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import TaskableWelcome from './components/TaskableWelcome';
import TaskifyProfile from './components/TaskifyProfile'; // Import the new component

export default function App() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "ed25802a-53aa-4165-9407-2906d615c0cd",
        walletConnectorExtensions: [EthersExtension],
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <Router>
        <DynamicWidget />
        <Routes>
          <Route path="/" element={<TaskableWelcome />} />
          <Route path="/profile" element={<TaskifyProfile />} />
        </Routes>
      </Router>
    </DynamicContextProvider>
  );
}

