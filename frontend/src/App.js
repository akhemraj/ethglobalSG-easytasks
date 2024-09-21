import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthersExtension } from "@dynamic-labs/ethers-v5";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import TaskableWelcome from './components/TaskableWelcome';
import TaskifyProfile from './components/TaskifyProfile'; 
import VerifyIdentity from './components/VerifyIdentity';
>>>>>>> 6a43687 (added verify with worldcoin page)


import TaskableWelcome from './components/TaskableWelcome';
import TaskifyProfile from './components/TaskifyProfile'; 
import VerifyIdentity from './components/VerifyIdentity';

// Menubar component
function MenuBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f8f9fa' }}>
      <div>
        <Link to="/" style={{ marginRight: '20px' }}>Home</Link>
        <Link to="/profile">Profile</Link>
      </div>
 
    </div>
  );
}

export default function App() {
  return (
   
      <Router>
        {/* Render the MenuBar */}
        {/* <MenuBar /> */}

        <Routes>
          <Route path="/" element={<TaskableWelcome />} />
          <Route path="/profile" element={<TaskifyProfile />} />
          <Route path="/verify" element={<VerifyIdentity />} />
        </Routes>
      </Router>
    
  );
}
