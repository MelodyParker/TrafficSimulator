<script lang="ts">
	import type World from "$lib/classes/representations/World";
  import Renderer from "$lib/classes/rendering/Renderer";
  import { onMount, SvelteComponent_1 } from "svelte";
  import { tentativeRoadParams } from "$lib/misc/stores";


  export let world: World;
  export let topLeft: number[];
  export let scale: number;





  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D | null;

  let renderer: Renderer; 
  let tempX: number = 0;
  
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
    if ($tentativeRoadParams.creatingRoad) {
      renderer.renderTentativeRoad($tentativeRoadParams);
    }
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