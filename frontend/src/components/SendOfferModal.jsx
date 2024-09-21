import * as React from "react";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import contractService from "../service/contractService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SendOfferModal({taskId}) {

 


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };



  const { primaryWallet } = useDynamicContext();
  const handleClick = async () => {
    console.log('sending offer...');
    const walletClient = await primaryWallet.getWalletClient();
    const account = await walletClient.account;
    const publicClient = await primaryWallet.getPublicClient();
    console.log('comes here 1 .... ', primaryWallet, taskId, value);
    const response = await contractService.submitOffer(
      publicClient,
      walletClient,
      taskId,
      value * 1000000,      
    );
    
    primaryWallet.isConnected().then((value) => {
      console.log(value);
      console.log("WE ARE CONNECTED");
    });
  };

  return (
    <div>
      <Button color="secondary" onClick={handleOpen}>
        Send Offer
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form class="w-full max-w-lg flex flex-col items-center">
              <TextField
                id="transition-modal-title"
                label="Offer Amount (in USDC)"
                type="number"
                value={value}
                onChange={handleChange}
                variant="outlined"
              />
              <Button className="mt-3" color="secondary" onClick={handleClick}>
                Send
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
