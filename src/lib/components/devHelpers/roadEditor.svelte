<script lang="ts">
	import type World from "$lib/classes/representations/World";
  import Renderer from "$lib/classes/rendering/Renderer";
  export let world: World;
  export let topLeft: number[];
  export let scale: number;


  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D | null;

  let renderer: Renderer; 
  let tempX: number = 0;
  let y: number = 50;
  let w: number = 40;
  let h: number = 30;
  export let screenW: number = 1000;
  export let screenH: number = 1000;

  $: scale, world, topLeft, updateRenderer()
  function updateRenderer() {
    if (context !== null)
      renderer = new Renderer(context, world, topLeft, scale, screenW, screenH);
  }
  function update() {
    world.update(1);
    tempX += 2;
    render();
  }

  function render() {
    renderer.render();
    requestAnimationFrame(update);
  }


  onMount(() => {
    context = canvas.getContext("2d");
    requestAnimationFrame(update);
    if (context !== null)
      renderer = new Renderer(context, world, topLeft, scale, screenW, screenH);

  })

</script>

<canvas 
  width={screenW}
  height={screenH}
  bind:this={canvas}
/>