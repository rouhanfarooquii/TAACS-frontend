<script>
  export let currentPage;
  export let totalPages;

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function goToPage(pageNumber) {
      if (pageNumber !== currentPage) {
          currentPage = pageNumber;
          dispatch('pageChange', { pageNumber });
      }
  }

  $: startPage = Math.max(1, currentPage - 2);
  $: endPage = Math.min(totalPages, currentPage + 2);

  // Adjust the range if we're near the beginning or end
  $: {
      if (currentPage <= 3) {
          endPage = Math.min(totalPages, 5);
      } else if (currentPage >= totalPages - 2) {
          startPage = Math.max(1, totalPages - 4);
      }
  }

  $: pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
</script>

<div class="flex justify-center my-4">
  <ul class="flex">
      {#if currentPage > 1}
          <li>
              <a class="page-link rounded-l" href="#" on:click|preventDefault={() => goToPage(currentPage - 1)}><span aria-hidden="true">&laquo;</span></a>
          </li>
      {/if}

      {#each pages as page}
          <li>
              <a class="page-link" href="#" class:selected={currentPage === page} on:click|preventDefault={() => goToPage(page)}>{page}</a>
          </li>
      {/each}

      {#if currentPage < totalPages}
          <li>
              <a class="page-link rounded-r" href="#" on:click|preventDefault={() => goToPage(currentPage + 1)}>&raquo;</a>
          </li>
      {/if}
  </ul>
</div>
