<script>
  import { createPopper } from "@popperjs/core";
  import { onMount, onDestroy } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { signOut } from "../../services/api";

  const image = "../assets/img/10.jpg";

  let dropdownPopoverShow = false;
  let btnDropdownRef;
  let popoverDropdownRef;

  const toggleDropdown = (event) => {
    event.preventDefault();
    dropdownPopoverShow = !dropdownPopoverShow;
    if (dropdownPopoverShow) {
      createPopper(btnDropdownRef, popoverDropdownRef, {
        placement: "bottom-start",
      });
    }
  };

  function closeDropdown() {
    dropdownPopoverShow = false;
  }

  function navigateToProfile() {
    navigate('/user/profile');
  }


  function handleClickOutside(event) {
    if (popoverDropdownRef && !popoverDropdownRef.contains(event.target) && btnDropdownRef && !btnDropdownRef.contains(event.target)) {
      closeDropdown();
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<div>
  <a
    class="text-blueGray-500 block"
    href="#pablo"
    bind:this="{btnDropdownRef}"
    on:click="{toggleDropdown}"
  >
    <div class="items-center flex">
      <span
        class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
      >
        <img
          alt="..."
          class="w-full rounded-full align-middle border-none shadow-lg"
          src="{image}"
        />
      </span>
    </div>
  </a>
  <div
    bind:this="{popoverDropdownRef}"
    class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow ? 'block':'hidden'}"
  >
    <a
      href="#pablo" on:click={(e) => e.preventDefault()}
      on:click="{signOut}"
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
    >
      Sign Out
    </a>
  </div>
</div>
