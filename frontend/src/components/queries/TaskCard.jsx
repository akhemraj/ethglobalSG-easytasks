import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SendOfferModal from "../SendOfferModal";
import SubmittedOfferByTaskId from "./SubmittedOfferByTaskId";

const TaskCard = ({ id, taskId, title, description, taskType, budget, isCreator }) => {
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
            'Offline'
            // <FormControlLabel control={<Switch checked />} label="Online" />
          ) : (
            'Online'
            // <FormControlLabel control={<Switch />} label="Online" />
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
          <SubmittedOfferByTaskId taskId={taskId} />
        ) : (
          <SendOfferModal taskId={taskId}/>
        )}
      </CardActions>
    </Card>
  );
};

export default TaskCard;
