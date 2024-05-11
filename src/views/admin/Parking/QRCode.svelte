<script>
    import { onMount } from 'svelte';
    import QRCode from 'qrcode';
  
    export let data;
    let canvas;
  
    onMount(async () => {
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
    });
  </script>
  
  <canvas bind:this={canvas}></canvas>