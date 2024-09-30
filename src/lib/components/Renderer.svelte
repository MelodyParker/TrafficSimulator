<script lang="ts">
	import type World from "$lib/classes/representations/World";
  export let world: World;
  import { onMount } from "svelte";
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D | null;
  let width: number = 200;
  let height: number = 200;

  let tempX: number = 0;
  let y: number = 50;
  let w: number = 40;
  let h: number = 30;

  function update() {
    world.update(1);
    tempX += 2;
    render();
  }

  function render() {
    if (context !== null)
      context.fillStyle = "#000";
    context?.fillRect(0,0,width,height)
    if (context !== null)
      context.fillStyle = "#fff";
    context?.fillRect(tempX, y, w, h);
    requestAnimationFrame(update)
  }


  onMount(() => {
    context = canvas.getContext("2d");
    requestAnimationFrame(update)
  })

</script>

<canvas 
  {width}
  {height}
  bind:this={canvas}
/>