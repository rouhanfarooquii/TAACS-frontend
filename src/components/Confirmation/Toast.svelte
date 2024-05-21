<script>
  import { fade } from 'svelte/transition';

  export let message = "";
  export let type = "success"; // 'success', 'error', 'info', etc.
  let show = true;

  // Auto hide the toast after 3 seconds
  setTimeout(() => {
    show = false;
  }, 1000);
</script>

<div class="toast {type}" transition:fade="{{ duration: 500 }}" class:hide={!show}>
  {message}
</div>