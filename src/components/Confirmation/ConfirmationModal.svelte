<!-- ConfirmationModal.svelte -->
<script>
    export let message = "Are you sure you want to delete this item?";
    export let onConfirm;
    export let onCancel;
</script>

<div class="modal">
    <div class="modal-content">
                <h3 class="font-semibold text-lg text-blueGray-700">
                Confirmation
                </h3>
                <hr class="mb-4">
        <div class="relative mb-5">
            <p class="block uppercase text-blueGray-600 text-sm font-bold mb-2">{message}</p>
        </div>
        <div class="flex justify-end">
            <button
                class="bg-red-600 text-white font-bold uppercase text-xs px-4 py-2 rounded mr-2"
                on:click={onConfirm}
            >
                Delete
            </button>
            <button
                class="bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded"
                on:click={onCancel}
            >
                Cancel
            </button>
        </div>
    </div>
</div>
