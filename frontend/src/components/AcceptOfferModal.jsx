import * as React from "react";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

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

export default function AcceptOfferModal({ offers }) {
  const [open, setOpen] = useState(false);
  const [acceptedId, setAcceptedId] = useState("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    console.log(`Initiating payment for offer ${acceptedId}...`);
    setIsPaymentSuccess(true);
  };

  const [value, setValue] = useState("");

  const acceptedOffer = (offerId) => {
    setAcceptedId(offerId);
    alert(`Offer ${offerId} accepted!`);
  };

  return (
    <div>
      <Button color="success" onClick={handleOpen}>
        Accept Offer
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
              {/* DISPLAY OFFERS HERE */}
              {offers.map((item, index) => (
                <div key={item.id} onClick={() => acceptedOffer(item.id)}>
                  <h2>{item.taskId}</h2>
                  <p>Amount: {item.offerAmount}</p>
                </div>
              ))}

              <Button className="mt-3" color="success" onClick={handleClick}>
                Initiate Payment
              </Button>

              {isPaymentSuccess && (
                <Alert severity="success">Payment successful.</Alert>
              )}
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
