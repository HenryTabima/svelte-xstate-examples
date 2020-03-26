<script>
  import { temperatureMachine } from '../state_machines/temperature'
  import { useMachine } from '../useMachine'

  const [temperatureState, send] = useMachine(temperatureMachine)

  $: celsius = $temperatureState.context.C
  $: farenheit = $temperatureState.context.F

  function celsiusChanged (e) {
    send('CELSIUS', { value: e.target.value })
  }
  function farenheitChanged (e) {
    send('FARENHEIT', { value: e.target.value })
  }
</script>

<section>
  <h2>Temperature<h2>
  <div class="container">
    <div class="celcius input-container">
      <h3>Celsius</h3>
      <input value={celsius} on:input={celsiusChanged} type="number">
    </div>
    <div class="celcius input-container">
      <h3>Farenheit</h3>
      <input value={farenheit} on:input={farenheitChanged} type="number">
    </div>
  </div>
</section>

<style>
  .container {
    display: flex;
    justify-content: space-around;
  }
  .input-container {
    width: 80%;
  }
</style>