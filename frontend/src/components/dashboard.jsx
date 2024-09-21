import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/base/Button';

import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';

const queryForFirstTenTasks = gql`{
  taskCreateds(first: 10) {
    taskType
    title
    taskId
    transactionHash
    id
    description
    creator
    budget
    blockNumber
    blockTimestamp
  }
}`

// const

const url = 'https://api.studio.thegraph.com/query/89506/easytasks_v1/version/latest';


function NewApp() {
  const { data, status } = useQuery({
    queryKey: ['data'],
    async queryFn() {
      return await request(url, queryForFirstTenTasks)
    }
  })
  return (
    <main>
      {status === 'pending' ? <div>Loading...</div> : null}
      {status === 'error' ? <div>Error ocurred querying the Subgraph</div> : null}
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



const Dashboard = () => {
  const [shown, setShown] = useState(false);

  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log(shown, ' < shown');
    console.log('button clicked....')
    setShown(true);
    console.log(shown, ' < shown after');

  }

  return (
    <>
    
      <Button onClick= {handleClick}>Button</Button>
  
    <QueryClientProvider client={queryClient}>
      <NewApp />
    </QueryClientProvider>
    </>
  );
};

export default Dashboard;
