<!-- MultiSelect.svelte -->
<script>
  export let options = [];
  export let selectedOptions = [];
  export let placeholder = "Select options";
  let dropdownOpen = false;

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function toggleOption(option) {
    if (selectedOptions.includes(option)) {
      selectedOptions = selectedOptions.filter(o => o !== option);
    } else {
      selectedOptions = [...selectedOptions, option];
    }
  }

  function isSelected(option) {
    return selectedOptions.includes(option);
  }
</script>

<div class="multiselect">
  <div class="border px-3 py-2 rounded cursor-pointer" on:click={toggleDropdown}>
    {#if selectedOptions.length > 0}
      {selectedOptions.join(', ')}
    {:else}
      {placeholder}
    {/if}
  </div>
  {#if dropdownOpen}
    <div class="multiselect-dropdown">
      {#each options as option}
        <div class:class="{isSelected(option) ? 'selected-option' : ''}" on:click={() => toggleOption(option)}>
          {option}
        </div>
      {/each}
    </div>
  {/if}
</div>
