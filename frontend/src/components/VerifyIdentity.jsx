import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import useWalletStore from "../store/wallet.jsx";

import contractService from "../service/contractService.js";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const VerifyIdentity = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const { primaryWallet } = useDynamicContext();

  const handleCreateTask = async () => {
    const walletClient = await primaryWallet.getWalletClient();
    const account = await walletClient.account;
    const publicClient = await primaryWallet.getPublicClient();
    const response = await contractService.createTask(
      publicClient,
      walletClient,
      "t1",
      "d1",
      1,
      "100"
    );

    primaryWallet.isConnected().then((value) => {
      console.log(value);
      console.log("WE ARE CONNECTED");
    });
  };
  const onSuccess = async (data) => {
    console.log("world id verification success", data);
    // Extract proof and email from the data object (adjust based on actual data structure)

    try {
      const response = await axios.post(
        "https://ethglobalsg-easytasks-be-5b1fa77ae872.herokuapp.com/api/verifyProof",
        {
          proof: data, // Send proof in request body
          // Send email in request body
          email,
        }
      );

      // If the request is successful
      console.log("Proof verification successful:", response.data);
      if (response.status == 200) {
        navigate("/dashboard");
      }
      // Handle success (e.g., show a success message or redirect the user)
    } catch (error) {
      // If the request fails
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Proof verification failed:", error.response.data);
        // Handle failure (e.g., show an error message)
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        // Handle network errors
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const handleVerify = (proof) => {
    console.log("verifying the proof", proof);
  };

  return (
    <Layout>
      <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden font-['Manrope','Noto_Sans',sans-serif]">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
              <h1 className="text-[#0d161b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
                Verify your identity to use EasyTasks
              </h1>
              <p className="text-[#0d161b] text-base font-normal leading-normal pb-3 pt-1 px-4">
                EasyTasks is using Worldcoin to verify new users. This is a
                one-time process that will take 5 minutes.
              </p>
              <div className="flex px-4 py-3">
                <IDKitWidget
                  app_id="app_staging_e7bc5518aa28f0a211351dbc5210d0ca" // obtained from the Developer Portal
                  action="test-inifinite-verification" // this is your action id from the Developer Portal
                  onSuccess={onSuccess} // callback when the modal is closed
                  // handleVerify={handleVerify} // optional callback when the proof is received
                  verification_level={VerificationLevel.Device}
                >
                  {({ open }) => (
                    <button
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#209cee] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
                      onClick={open}
                    >
                      <span className="truncate">Verify with World ID</span>
                    </button>
                  )}
                </IDKitWidget>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyIdentity;
