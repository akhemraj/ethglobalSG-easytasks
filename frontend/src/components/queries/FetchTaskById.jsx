import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/base/Button';

import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';
import SubmittedOfferByTaskId from './SubmittedOfferByTaskId';



const url = 'https://api.studio.thegraph.com/query/89506/easytasks_v1/version/latest';


function Tasks(props) {
  const { data, status } = useQuery({
    queryKey: ['data'],
    async queryFn() {
      return await request(url, ` {
        taskCreated(id: "${props.taskId}") {
          taskType
          title
          transactionHash
          taskId
          id
          description
          creator
          budget
          blockTimestamp
          blockNumber
        }
      }`
    );
    }
  })

  console.log('task id 123 :' , props.taskId)
  return (
    <main>
      {status === 'pending' ? <div>Loading...</div> : null}
      {status === 'error' ? <div>Error ocurred querying the Subgraph</div> : null}
      <div>{JSON.stringify(data ?? {})}</div>
      {data ? <SubmittedOfferByTaskId taskId={data.taskCreated.taskId}/>: <div> No offers submitted for the task</div> }
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



const FetchTaskById = (props) => {
    
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Tasks taskId={props.taskId} />
    </QueryClientProvider>
    </>
  );
};

export default FetchTaskById;
