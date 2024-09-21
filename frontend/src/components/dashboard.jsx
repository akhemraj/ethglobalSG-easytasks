import React from 'react'
import FetchOffers from './queries/fetchOffers'
import FetchTasks from './queries/fetchTasks'

export default function Dashboard() {
  return (
    <>
      <FetchOffers/>
      <FetchTasks/>
    </>
  )
}
