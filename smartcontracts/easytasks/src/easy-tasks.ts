import {
  OfferAccepted as OfferAcceptedEvent,
  OfferSubmitted as OfferSubmittedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PaymentSent as PaymentSentEvent,
  TaskCompleted as TaskCompletedEvent,
  TaskCreated as TaskCreatedEvent
} from "../generated/EasyTasks/EasyTasks"
import {
  OfferAccepted,
  OfferSubmitted,
  OwnershipTransferred,
  PaymentSent,
  TaskCompleted,
  TaskCreated
} from "../generated/schema"

export function handleOfferAccepted(event: OfferAcceptedEvent): void {
  let entity = new OfferAccepted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.taskId = event.params.taskId
  entity.offerer = event.params.offerer
  entity.acceptedAmount = event.params.acceptedAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOfferSubmitted(event: OfferSubmittedEvent): void {
  let entity = new OfferSubmitted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.taskId = event.params.taskId
  entity.offerer = event.params.offerer
  entity.offerAmount = event.params.offerAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaymentSent(event: PaymentSentEvent): void {
  let entity = new PaymentSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTaskCompleted(event: TaskCompletedEvent): void {
  let entity = new TaskCompleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.taskId = event.params.taskId
  entity.offerer = event.params.offerer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTaskCreated(event: TaskCreatedEvent): void {
  let entity = new TaskCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.taskId = event.params.taskId
  entity.creator = event.params.creator
  entity.description = event.params.description
  entity.budget = event.params.budget

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
