import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import TaskCard from "./TaskCard";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const queryForFirstTenTasks = gql`
  {
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
  }
`;

const url =
  "https://api.studio.thegraph.com/query/89506/easytasks_v1/version/latest";

function Tasks() {
  const { data, status } = useQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, queryForFirstTenTasks);
    },
  });

  console.log("TASKS DATA:", JSON.stringify(data ?? {}));
  const { primaryWallet } = useDynamicContext();

  return (
    <>
      {status === "pending" ? <div>Loading...</div> : null}
      {status === "error" ? (
        <div>Error ocurred querying the Subgraph</div>
      ) : null}

      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <h1 className="text-3xl text-center font-semibold mt-6">Browse</h1>
        <div className=" gap-12 flex-col sm:flex-row">
          {data?.taskCreateds?.map((q) => (
            console.log(q),
            <TaskCard
              key={q.id} 
              id={q.id}
              taskId={q.taskId}
              title={q.title}
              description={q.description}
              taskType={q.taskType}
              budget={parseFloat(q.budget) / 1000000}
              isCreator={q.creator.toLowerCase() === primaryWallet?.address.toLowerCase()}
            />
          ))}
        </div>
      </div>
    </>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const FetchTasks = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Tasks />
      </QueryClientProvider>
    </>
  );
};

export default FetchTasks;
