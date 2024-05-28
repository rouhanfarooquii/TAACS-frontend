<script>
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
  
    let startDate = '2024-05-01';
    let endDate = '2024-05-31';
    const dispatch = createEventDispatcher();
  
    function updateDateRange() {
      dispatch('update', { startDate, endDate });
    }
  
    onMount(() => {
      updateDateRange();
    });
  </script>
  
  <div class="date-filter">
    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
      Start Date:
      <input type="date" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={startDate} on:change={updateDateRange} />
    </label>
    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
      End Date:
      <input type="date" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" bind:value={endDate} on:change={updateDateRange} />
    </label>
  </div>
  