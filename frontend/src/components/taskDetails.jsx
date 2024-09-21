import React from 'react'
import FetchOffers from './queries/fetchOffers'
import FetchTasks from './queries/fetchTasks'
import FetchTaskById from './queries/FetchTaskById'


export default function TaskDetails() {
  

  return (
    <>
    {/* <div>Hello task details</div> */}
      <FetchTaskById taskId="0x67ff6fa678a921508ebd7de9e809460191be59cc87b3a9e9b67989a2c8f4ef7d45000000"/>
      
    </>
  )
}
