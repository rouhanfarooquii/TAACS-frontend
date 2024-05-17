<script>
    import { navigate } from 'svelte-routing';
    export let color = "light";

    let currentTime = new Date();

    let request = {
        id: '',
        name: '',
        email: '',
        dateFrom: '',
        dateTo: '',
        reason: '',
        timeStamp: '',
        attachment: null
    };

    let fromDate, toDate;
    let errors = {
        id: '',
        name: '',
        email: '',
        dateFrom: '',
        dateTo: '',
        reason: ''
    };

    function validate() {
        fromDate = new Date(request.dateFrom);
        toDate = new Date(request.dateTo);

        errors.id = request.id === '' ? 'Employee ID is required.' : '';
        errors.name = request.name === '' ? 'Name is required.' : '';
        errors.email = request.email === '' ? 'Email is required.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.email) ? 'Email format is wrong.' : '';
        errors.dateFrom = request.dateFrom === '' ? 'Start date is required.' : '';
        errors.dateTo = request.dateTo === '' ? 'End date is required.' : fromDate > toDate ? 'Date To is before Date From.' : '';
        errors.reason = request.reason === '' ? 'Reason is required.' : '';

        return !Object.values(errors).some(error => error !== '');
    }

    function handleSubmit() {
        if (!validate()) {
            return;
        }

        request.timeStamp = currentTime;
        console.log(request);
    }

    function goBack() {
        navigate('/profile');
        console.log("Navigate to Profile screen");
    }

    function handleFileUpload(event) {
        request.attachment = event.target.files[0];
        console.log('File attached:', request.attachment);
    }
</script>

<div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
        <h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
            Leave Requests
        </h3>
    </div>
    <br>

    <!-- Filters Row 1 -->
    <div class="flex justify-between mb-4 ml-4 mr-4">
        <div class="relative mb-3">
            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 {errors.id ? 'label-required' : ''}" for="filterEmployeeID">
                Employee ID:
            </label>
            <input type="text" id="filterEmployeeID" name="filterEmployeeID" class="custom-filter-input {errors.id ? 'input-error' : ''}" placeholder="Employee ID" bind:value={request.id}>
            {#if errors.id}<p class="text-red-500 text-xs italic">{errors.id}</p>{/if}
        </div>

        <div class="relative mb-3">
            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 {errors.name ? 'label-required' : ''}" for="filterName">Name:</label>
            <input type="text" id="filterName" name="filterName" class="custom-filter-input {errors.name ? 'input-error' : ''}" placeholder="Name" bind:value={request.name}>
            {#if errors.name}<p class="text-red-500 text-xs italic">{errors.name}</p>{/if}
        </div>

        <div class="relative mb-3">
            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 {errors.email ? 'label-required' : ''}" for="filterPosition">Email:</label>
            <input type="text" id="filterPosition" name="filterPosition" class="custom-filter-input {errors.email ? 'input-error' : ''}" placeholder="Email" bind:value={request.email}>
            {#if errors.email}<p class="text-red-500 text-xs italic">{errors.email}</p>{/if}
        </div>
    </div>
    
    <!-- Filters Row 2 -->
    <div class="flex justify-between mb-4 ml-4 mr-4">
        <div class="relative mb-3">
            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 {errors.dateFrom ? 'label-required' : ''}" for="dateFrom">
                From:
            </label>
            <input type="datetime-local" id="dateFrom" placeholder="Date & Time From" class="custom-filter-input {errors.dateFrom ? 'input-error' : ''}" bind:value={request.dateFrom}>
            {#if errors.dateFrom}<p class="text-red-500 text-xs italic">{errors.dateFrom}</p>{/if}
        </div>

        <div class="relative mb-3">
            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 {errors.dateTo ? 'label-required' : ''}" for="dateTo">
                To:
            </label>
            <input type="datetime-local" id="dateTo" placeholder="Date & Time To" class="custom-filter-input {errors.dateTo ? 'input-error' : ''}" bind:value={request.dateTo}>
            {#if errors.dateTo}<p class="text-red-500 text-xs italic">{errors.dateTo}</p>{/if}
        </div>
        
        <div class="relative mb-3">
            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 {errors.reason ? 'label-required' : ''}" for="reason">
                Reason:
            </label>
            <textarea id="reason" name="reason" class="custom-filter-input resize-none {errors.reason ? 'input-error' : ''}" placeholder="Reason:" bind:value={request.reason}></textarea>
            {#if errors.reason}<p class="text-red-500 text-xs italic">{errors.reason}</p>{/if}
        </div>
    </div>

    <!-- File Attachment -->
    <div class="flex justify-between mb-4 ml-4 mr-4">
        <div class="relative mb-3">
            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="fileAttachment">
                Attach File:
            </label>
            <input type="file" id="fileAttachment" name="fileAttachment" class="custom-filter-input" accept=".pdf, .jpg, .jpeg, .png" on:change={handleFileUpload}>
        </div>
    </div>
</div>

<div class="flex justify-end mb-4">
    <button class="bg-blueGray-600 text-white active:bg-blueGray-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none mr-1 focus:outline-none ease-linear transition-all duration-150" on:click={handleSubmit}>
        Submit
    </button>
    <button class="bg-red-600 text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" on:click={goBack}>
        Cancel
    </button>
</div>
