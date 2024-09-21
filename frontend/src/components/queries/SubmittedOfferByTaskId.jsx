import AcceptOfferModal from "../AcceptOfferModal";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { request } from "graphql-request";
import LoadingButton from "@mui/lab/LoadingButton";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

import contractService from "../../service/contractService.js";

const url =
  "https://api.studio.thegraph.com/query/89506/easytasks_v1/version/latest";

const divStyle = {
  color: "blue",
  backgroundColor: "lightgray",
  width: "50vh",
  height: "50vh",
};

function Tasks(props) {
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

  const { data, status } = useQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(
        url,
        `query MyQuery {
        offerSubmitteds(where: {taskId: "${props.taskId}"}) {
          id
        }
      }`
      );
    },
  });

  console.log("task id 123 :", props.taskId);
  return (
    <div className="items-center grid">
      {status === "pending" ? (
        <LoadingButton loading variant="text">
          LOADING
        </LoadingButton>
      ) : null}
      {/* {status === "error" ? (
        <div>Error ocurred querying the Subgraph</div>
      ) : null} */}

      {/* {data ? <div>{data}</div>: <div> No offers submitted for the task</div> } */}
      {data?.length > 0 ? (
        <AcceptOfferModal offers={data} />
      ) : (
        <p className="text-center">No data available</p>
      )}
      {/* <div>{JSON.stringify(data ?? {})}</div> */}
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const SubmittedOfferByTaskId = ({ taskId }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Tasks taskId={taskId} />
      </QueryClientProvider>
    </>
  );
};

export default SubmittedOfferByTaskId;
