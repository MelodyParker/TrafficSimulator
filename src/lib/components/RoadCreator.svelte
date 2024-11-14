<script lang="ts">
  import Renderer from "$lib/components/Renderer.svelte";
	import Road from "$lib/classes/representations/Road";
  import { tentativeRoadParams } from "$lib/misc/stores";

  let roadLength: number = 50;
  let roadStartX: number = 0;
  let roadStartY: number = 0;
  let roadIsHorizontal: boolean = true;

  function setTentativeRoadParams() {
    tentativeRoadParams.set({
        roadLength: roadLength,
        roadStartPos: [roadStartX, roadStartY],
        roadIsHorizontal: roadIsHorizontal,
        creatingRoad: false
      })
  }
  setTentativeRoadParams();
  $: roadLength, roadStartX, roadStartY, roadIsHorizontal, setTentativeRoadParams()

  export let addRoad: Function;

  function onSubmit() {
    addRoad(roadIsHorizontal, roadLength, [roadStartX, roadStartY]);
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <div>
    <label for="isHorizontal">Road Is Horizontal:</label> <input value="isHorizontal" id="isHorizontal" type="checkbox" bind:checked={roadIsHorizontal}>
  </div>
  <div>
    <label for="roadStartX">
      Road Start X Position: 
    </label>
    <input type="range" min="0" max="30" step="0.1" bind:value={roadStartX}>
    <input id="roadStartX" type="number" step="0.1" bind:value={roadStartX}>  
  </div>
  <div>
    <label for="roadStartY">
      Road Start Y Position: 
    </label>
    <input type="range" min="0" max="30" step="0.1" bind:value={roadStartY}>
    <input id="roadStartY" type="number" step="0.1" bind:value={roadStartY}>  
  </div>
  <div>
    <label for="length">Road Length:</label> 
    <input type="range" name="length" id="lengthRange" bind:value={roadLength}>
    <input type="number" name="length" id="length" bind:value={roadLength}>
  </div>
  <button type="submit">Add Road</button>
</form>