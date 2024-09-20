import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { OfferAccepted } from "../generated/schema"
import { OfferAccepted as OfferAcceptedEvent } from "../generated/EasyTasks/EasyTasks"
import { handleOfferAccepted } from "../src/easy-tasks"
import { createOfferAcceptedEvent } from "./easy-tasks-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let taskId = BigInt.fromI32(234)
    let offerer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let acceptedAmount = BigInt.fromI32(234)
    let newOfferAcceptedEvent = createOfferAcceptedEvent(
      taskId,
      offerer,
      acceptedAmount
    )
    handleOfferAccepted(newOfferAcceptedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("OfferAccepted created and stored", () => {
    assert.entityCount("OfferAccepted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "OfferAccepted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "taskId",
      "234"
    )
    assert.fieldEquals(
      "OfferAccepted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "offerer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "OfferAccepted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "acceptedAmount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
