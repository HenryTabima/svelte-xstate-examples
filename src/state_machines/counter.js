import { createMachine, assign } from 'xstate'

export const counterMachine = createMachine({
  id: 'counter_machine',
  initial: 'active',
  context: { count: 0 },
  states: {
    active: {
      on: {
        INCREMENT: {
          actions: assign({ count: ctx => ctx.count + 1 })
        },
        RESET: {
          actions: assign({ count: ctx => 0 })
        }
      }
    }
  }
})
