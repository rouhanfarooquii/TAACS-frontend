<!-- MultiSelect.svelte
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
          {#if isSelected(option)}
            <i class="fas fa-check-circle icon"></i>
          {:else}
            <i class="far fa-circle icon"></i>
          {/if}
          {option}
        </div>
      {/each}
    </div>
  {/if}
</div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" /> -->


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

  function handleCheckboxChange(event, option) {
    if (option === 'Select All') {
      if (selectedOptions.length === options.length) {
        selectedOptions = [];
      } else {
        selectedOptions = [...options];
      }
    } else {
      toggleOption(option);
    }
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
      <label class="checkbox-container">
        <input type="checkbox" checked={selectedOptions.length === options.length} on:change={(event) => handleCheckboxChange(event, 'Select All')}>
        <span class="checkmark"></span>
        Select All
      </label>
      {#each options as option}
        <label class="checkbox-container">
          <input type="checkbox" checked={isSelected(option) || (selectedOptions.length === options.length)} on:change={(event) => handleCheckboxChange(event, option)}>
          <span class="checkmark"></span>
          {option}
        </label>
      {/each}
    </div>
  {/if}
</div>
