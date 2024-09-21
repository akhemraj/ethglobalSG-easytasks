import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import contractService from "../../service/contractService";
import SubmittedOfferByTaskId from "./SubmittedOfferByTaskId";


const TaskCard = ({ taskId, title, description, taskType, budget, isCreator }) => {
  const { primaryWallet } = useDynamicContext();


  const handleSendOfferClick = async () => {
    console.log("Sending offer...");

  
  };

  const handleAcceptOfferClick = async () => {
    console.log("accepting offer...");

    // const walletClient = await primaryWallet.getWalletClient();
    // const account = await walletClient.account;
    // const publicClient = await primaryWallet.getPublicClient();
    // const response = await contractService.createTask(
    //   publicClient,
    //   walletClient,
    //  taskId,
    //  offerIndex
    // );

    // primaryWallet.isConnected().then((value) => {
    //   console.log(value);
    //   console.log("WE ARE CONNECTED");
    // });

  };

  

  return (
    <Card style={{ maxWidth: 345, margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <FormGroup>
          {parseInt(taskType) === 1 ? (
            <FormControlLabel control={<Switch checked />} label="Online" />
          ) : (
            <FormControlLabel control={<Switch />} label="Online" />
          )}
        </FormGroup>
        <Typography variant="body3" color="primary">
          $
          {budget.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          USDC
        </Typography>
      </CardContent>

      <CardActions>
        {isCreator ? (
         <> <SubmittedOfferByTaskId taskId={taskId}/>

          <Button size="small" color="success" onClick={() => handleAcceptOfferClick()}>
            Accept Offer

          </Button></>
        ) : (
          <Button size="small" color="secondary" onClick={handleSendOfferClick}>
            Send Offer
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default TaskCard;
