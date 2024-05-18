<script>
  import { onMount } from 'svelte';
  import QRCode from 'qrcode';

  export let data;
  let canvas;

  // Generate QR code when component mounts
  onMount(() => {
    generateQRCode();
  });

  // Reactive statement to regenerate QR code when data changes
  $: data, generateQRCode();

  async function generateQRCode() {
    console.log("Generating QR for:", data);
    if (canvas && data) {
      try {
        await QRCode.toCanvas(canvas, data.toString(), {
          width: 80,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#ffffff"
          }
        });
      } catch (err) {
        console.error('Error generating QR code', err);
      }
    }
  }
</script>

<canvas bind:this={canvas}></canvas>