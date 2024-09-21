import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/base/Button';

import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

import contractService from "../../service/contractService.js";

const url = 'https://api.studio.thegraph.com/query/89506/easytasks_v1/version/latest';

const divStyle = {
    color: 'blue',
    backgroundColor: 'lightgray',
    width: '50vh',
    height: '50vh',
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
    queryKey: ['data'],
    async queryFn() {
      return await request(url, `query MyQuery {
        offerSubmitteds(where: {taskId: "${props.taskId}"}) {
          id
        }
      }`
    );
    }
  })

  const acceptedOffer = (offerId) => {

  }

  console.log('task id 123 :' , props.taskId)
  return (
    <main>
      {status === 'pending' ? <div>Loading...</div> : null}
      {status === 'error' ? <div>Error ocurred querying the Subgraph</div> : null}
      
      {/* {data ? <div>{data}</div>: <div> No offers submitted for the task</div> } */}
      {
    data?.length > 0 ? (
    <div >
      {data.map((item, index) => (
        <div key={item.id} onClick={() => acceptedOffer(item.id)}>
          <h2>{item.taskId}</h2>
          <p>Amount: {item.offerAmount}</p>
        </div>
      ))}
    </div>
  ) : (
    <p>No data available</p>
  )
}
      <div>{JSON.stringify(data ?? {})}</div>
    </main>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});



const SubmittedOfferByTaskId = (props) => {
    
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Tasks taskId={props.taskId} />
    </QueryClientProvider>
    </>
  );
};

export default SubmittedOfferByTaskId;



