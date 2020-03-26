import { createMachine, assign } from 'xstate'

export const flightBookerMachine = createMachine({
  id: 'flight_booker_machine',
  initial: 'editing',
  context: {
    startDate: undefined,
    returnDate: undefined,
    trip: 'oneWay'
  },
  states: {
    editing: {
      on: {
        'startDate.UPDATE': {
          actions: assign({
            startDate: (_, event) => event.value
          })
        },
        'returnDate.UPDATE': {
          cond: context => context.trip === 'roundTrip',
          actions: assign({
            returnDate: (_, event) => event.value
          })
        },
        SET_TRIP: {
          cond: (_, event) => ['oneWay', 'roundTrip'].includes(event.value),
          actions: assign({
            trip: (_, event) => event.value
          })
        },
        SUBMIT: {
          target: 'submitted',
          cond: context => {
            if (context.trip === 'oneWay') {
              return !!context.startDate
            } else {
              return (
                !!context.startDate &&
                !!context.returnDate &&
                context.returnDate > context.startDate
              )
            }
          }
        }
      }
    },
    submitted: {
      on: {
        RESET: 'editing'
      }
    }
  }
})
