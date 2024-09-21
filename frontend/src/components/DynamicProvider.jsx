import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { useNavigate } from "react-router-dom";
import { EthersExtension } from "@dynamic-labs/ethers-v5";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import axios from "axios";

const DynamicProvider = () => {
  const navigate = useNavigate();

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
          const authToken = localStorage.getItem(
            "dynamic_authentication_token"
          );
          console.log("sending token to backend", authToken);

          const response = await axios.post(
            "https://ethglobalsg-easytasks-be-5b1fa77ae872.herokuapp.com/api/signUpOrSignIn",
            {
              token: authToken, // Send proof in request body
              // Send email in request body
            }
          );

          if (response.status === 200) {
            console.log("RESPONSE:", response);

            localStorage.setItem("email", response.data.email);

            const { isNewUser } = response.data.isNewUser;
            if (isNewUser === true) {
              // If user does not have a profile: /profile
              navigate("/profile");
            } else if (response.data.isVerified) {
              // If user has profile and verfied: /dashboard
              navigate("/dashboard");
            } else {
              // If user has profile but not verified: /verify
              navigate("/verify");
            }
          } else {
            console.log("error occurred while calling api");
          }
        },
      },
    }}
  >
    <DynamicWidget />
  </DynamicContextProvider>;
};

export default DynamicProvider;
