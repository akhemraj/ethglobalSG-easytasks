import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/base/Button';

import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';

const offerFetchQuery = gql`{
  offerAccepteds(first: 10) {
    id
    offerer
    taskId
    transactionHash
  }
}`



// const

const url = 'https://api.studio.thegraph.com/query/89506/easytasks_v1/version/latest';



function Offers() {
  const { data, status } = useQuery({
    queryKey: ['data'],
    async queryFn() {
      return await request(url, offerFetchQuery)
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



const FetchOffers = () => {
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <Offers/>
    </QueryClientProvider>
    </>
  );
};

export default FetchOffers;
