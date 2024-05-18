<script>
  import { onMount, onDestroy } from 'svelte';

  export let options = [];
  export let selectedOptions = [];
  export let placeholder = "Select options";
  let dropdownOpen = false;
  let multiSelectRef;

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function closeDropdown() {
    dropdownOpen = false;
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

  function handleClickOutside(event) {
    if (multiSelectRef && !multiSelectRef.contains(event.target)) {
      closeDropdown();
    }
  }

  onMount(() => {
    window.addEventListener('click', handleClickOutside);
  });

  onDestroy(() => {
    window.removeEventListener('click', handleClickOutside);
  });
</script>

<div class="multiselect" bind:this={multiSelectRef}>
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
          <input type="checkbox" checked={isSelected(option)} on:change={(event) => handleCheckboxChange(event, option)}>
          <span class="checkmark"></span>
          {option}
        </label>
      {/each}
    </div>
  {/if}
</div>