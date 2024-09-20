import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  OfferAccepted,
  OfferSubmitted,
  OwnershipTransferred,
  PaymentSent,
  TaskCompleted,
  TaskCreated
} from "../generated/EasyTasks/EasyTasks"

export function createOfferAcceptedEvent(
  taskId: BigInt,
  offerer: Address,
  acceptedAmount: BigInt
): OfferAccepted {
  let offerAcceptedEvent = changetype<OfferAccepted>(newMockEvent())

  offerAcceptedEvent.parameters = new Array()

  offerAcceptedEvent.parameters.push(
    new ethereum.EventParam("taskId", ethereum.Value.fromUnsignedBigInt(taskId))
  )
  offerAcceptedEvent.parameters.push(
    new ethereum.EventParam("offerer", ethereum.Value.fromAddress(offerer))
  )
  offerAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "acceptedAmount",
      ethereum.Value.fromUnsignedBigInt(acceptedAmount)
    )
  )

  return offerAcceptedEvent
}

export function createOfferSubmittedEvent(
  taskId: BigInt,
  offerer: Address,
  offerAmount: BigInt
): OfferSubmitted {
  let offerSubmittedEvent = changetype<OfferSubmitted>(newMockEvent())

  offerSubmittedEvent.parameters = new Array()

  offerSubmittedEvent.parameters.push(
    new ethereum.EventParam("taskId", ethereum.Value.fromUnsignedBigInt(taskId))
  )
  offerSubmittedEvent.parameters.push(
    new ethereum.EventParam("offerer", ethereum.Value.fromAddress(offerer))
  )
  offerSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "offerAmount",
      ethereum.Value.fromUnsignedBigInt(offerAmount)
    )
  )

  return offerSubmittedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPaymentSentEvent(
  taskId: BigInt,
  from: Address,
  to: Address,
  amount: BigInt
): PaymentSent {
  let paymentSentEvent = changetype<PaymentSent>(newMockEvent())

  paymentSentEvent.parameters = new Array()

  paymentSentEvent.parameters.push(
    new ethereum.EventParam("taskId", ethereum.Value.fromUnsignedBigInt(taskId))
  )
  paymentSentEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  paymentSentEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  paymentSentEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return paymentSentEvent
}

export function createTaskCompletedEvent(
  taskId: BigInt,
  offerer: Address
): TaskCompleted {
  let taskCompletedEvent = changetype<TaskCompleted>(newMockEvent())

  taskCompletedEvent.parameters = new Array()

  taskCompletedEvent.parameters.push(
    new ethereum.EventParam("taskId", ethereum.Value.fromUnsignedBigInt(taskId))
  )
  taskCompletedEvent.parameters.push(
    new ethereum.EventParam("offerer", ethereum.Value.fromAddress(offerer))
  )

  return taskCompletedEvent
}

export function createTaskCreatedEvent(
  taskId: BigInt,
  creator: Address,
  title: string,
  taskType: i32,
  description: string,
  budget: BigInt
): TaskCreated {
  let taskCreatedEvent = changetype<TaskCreated>(newMockEvent())

  taskCreatedEvent.parameters = new Array()

  taskCreatedEvent.parameters.push(
    new ethereum.EventParam("taskId", ethereum.Value.fromUnsignedBigInt(taskId))
  )
  taskCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  taskCreatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  taskCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "taskType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(taskType))
    )
  )
  taskCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  taskCreatedEvent.parameters.push(
    new ethereum.EventParam("budget", ethereum.Value.fromUnsignedBigInt(budget))
  )

  return taskCreatedEvent
}
