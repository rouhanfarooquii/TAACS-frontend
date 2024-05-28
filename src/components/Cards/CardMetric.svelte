<script>
    export let title;
    export let value;
    export let color;
  </script>
  
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg px-4 py-5" style="border-left: 4px solid {color};">
    <div class="flex-auto">
      <h5 class="text-blueGray-400 uppercase font-bold text-xs">
        {title}
      </h5>
      <span class="font-semibold text-xl text-blueGray-700">
        {value}
      </span>
    </div>
  </div>
  