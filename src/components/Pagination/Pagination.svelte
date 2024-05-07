<script>
    export let currentPage;
    export let totalPages;
  
    import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

function goToPage(pageNumber) {
    if (pageNumber !== currentPage) {
        currentPage = pageNumber;
        dispatch('pageChange', { pageNumber });  // Use dispatch to emit the event
    }
}
  </script>
  
  <div class="flex justify-center my-4">
    <ul class="flex">
      {#if currentPage > 1}
        <li>
          <a class="page-link" href="#" on:click|preventDefault={() => goToPage(currentPage - 1)}><span aria-hidden="true">&laquo;</span></a>
        </li>
      {/if}
  
      {#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
        <li>
          <a class="page-link" href="#" class:selected={currentPage === page} on:click|preventDefault={() => goToPage(page)}>{page}</a>
        </li>
      {/each}
  
      {#if currentPage < totalPages}
        <li>
          <a class="page-link" href="#" on:click|preventDefault={() => goToPage(currentPage + 1)}>&raquo;</a>
        </li>
      {/if}
    </ul>
  </div>