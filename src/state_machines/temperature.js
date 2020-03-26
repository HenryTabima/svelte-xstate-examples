import { createMachine, assign } from 'xstate'

export const temperatureMachine = createMachine({
  id: 'temperature_machine',
  initial: 'active',
  context: { C: undefined, F: undefined },
  states: {
    active: {
      on: {
        CELSIUS: {
          actions: assign({
            C: (ctx, event) => event.value,
            F: (ctx, event) => event.value.length ? +event.value * (9 / 5) + 32 : ''
          })
        },
        FARENHEIT: {
          actions: assign({
            C: (ctx, event) => event.value.length ? (+event.value - 32) * (5 / 9) : '',
            F: (ctx, event) => event.value
          })
        }
      }
    }
  }
})