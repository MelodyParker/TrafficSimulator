<script lang="ts">
  import Renderer from "$lib/components/Renderer.svelte";
  import World from "$lib/classes/representations/World";
  import RoadCreator from "$lib/components/RoadCreator.svelte";
  import { tentativeRoadParams } from "$lib/misc/stores";
	import { setContext } from "svelte";


  let world: World = new World();
  setContext("world", world);
  let scale: number = 20;
  let topLeft: number[] = [0, 0];
  let screenW = 1000;
  let screenH = 500;
  let creatingRoad = false;

  $: creatingRoad, tentativeRoadParams.update(v => {
    v.creatingRoad = creatingRoad;
    return v;
  })

  
  function addRoad(isHorizontal: boolean, roadLength: number, roadStartPos: number[]) {
    console.log("adding road with params")
    world.addRoad(isHorizontal, roadLength, roadStartPos);
    creatingRoad = false;
  }
</script>
<Renderer {world} {topLeft} bind:scale={scale} {screenW} {screenH}/>

{#if creatingRoad}
  <RoadCreator addRoad={addRoad}/>
{/if}
{#if !creatingRoad} 
  <button on:click={()=>{creatingRoad = true;}}>Open Create Road Menu</button>
{/if}
