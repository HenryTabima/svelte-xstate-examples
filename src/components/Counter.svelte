<script>
  import { useMachine } from '../useMachine'
  import { counterMachine } from '../state_machines/counter'

  const [counterState, send] = useMachine(counterMachine)
</script>

<section>
  <h2>Counter</h2>
  <div class="count-container">{ $counterState.context.count }</div>
  <button class="btn" on:click={() => send('INCREMENT')}>Count</button>
  <button class="btn" on:click={() => send('RESET')}>Reset</button>
</section>

<style>
  .count-container {
    font-size: 3rem;
    width: 100px;
    height: 100px;
    line-height: 100px;
    margin: auto;
    border: 1px solid #aaa;
    border-radius: 10px;
  }

  button {
    margin-top: 15px;
    border: none;
    cursor: pointer;
    background-color: #ff3e00;
    color: white;
    padding: 7px 15px;
    border-radius: 7px;
    font-weight: bold;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, .4);
    transition: transform .2s;
  }

  button:active {
    background-color: #ff3e00;
    transform: translateY(2px)
  }
</style>