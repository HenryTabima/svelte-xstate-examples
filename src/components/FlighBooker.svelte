<script>
  import Datepicker from 'svelte-calendar'
  import { flightBookerMachine } from '../state_machines/flight_booker'
  import { useMachine } from '../useMachine'

  const [bookerState, send] = useMachine(flightBookerMachine)

  $: trip = $bookerState.context.trip
  $: startDate = $bookerState.context.startDate
  $: returnDate = $bookerState.context.returnDate

  $: canSubmit = flightBookerMachine.transition($bookerState, 'SUBMIT').changed
  $: startDateError = !startDate ? 'Select a starting date' : null
  $: returnDateError = (trip === 'roundTrip' && !returnDate) ? 'Select a return date' : null
  $: rangeError = (trip === 'roundTrip' && !!startDate && !!returnDate && startDate > returnDate) ? 'Start date must sooner than Return date' : null
</script>

<section>
  <h2>Flight Booker</h2>
  <form on:submit|preventDefault={() => send('SUBMIT')}>
    <select value={trip} on:change={e => send('SET_TRIP', { value: e.target.value })}>
      <option value="oneWay">One way</option>
      <option value="roundTrip">Round trip</option>
    </select>
    <input type="date" on:change={e => send('startDate.UPDATE', { value: e.target.value })}>
    {#if trip === 'roundTrip'}
    <input type="date" on:change={e => send('returnDate.UPDATE', { value: e.target.value })}>
    {/if}
    <button class="btn" disabled={!canSubmit}>Submit</button>
  </form>
  {#if startDateError}
    <p class="alert">{startDateError}</p>
  {/if}
  {#if returnDateError}
    <p class="alert">{returnDateError}</p>
  {/if}
  {#if rangeError}
    <p class="alert">{rangeError}</p>
  {/if}
    <p>Current State: {$bookerState.value}</p>
  {#if $bookerState.matches('submitted')}
    <button class="btn" on:click={() => send('RESET')}>Reset Machine</button>
  {/if}
</section>

<style>
  p.alert {
    color: red;
  }
</style>