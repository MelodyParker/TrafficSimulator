<script lang="ts">
  import Renderer from "$lib/components/Renderer.svelte";
  import World from "$lib/classes/representations/World";
  import RoadCreator from "$lib/components/RoadCreator.svelte";
  import VehicleCreator from "$lib/components/VehicleCreator.svelte";
  import { tentativeRoadParams } from "$lib/misc/stores";


  let world: World = new World();
  // setContext("world", world);
  let scale: number = 20;
  let topLeft: number[] = [0, 0];
  let screenW = 1000;
  let screenH = 500;
  let creatingRoad = false;

  let creatingVehicle = false;

  $: creatingRoad, tentativeRoadParams.update(v => {
    v.creatingRoad = creatingRoad;
    return v;
  })

  
  function addRoad(isHorizontal: boolean, roadLength: number, roadStartPos: number[]) {
    console.log("adding road with params")
    world.addRoad(isHorizontal, roadLength, roadStartPos);
    creatingRoad = false;
    world = world;
  }


  function addVehicle(roadId: number, direction: boolean, speed: number) {
    console.log("trying to add vehicle")

    let road = world.getRoadById(roadId);
    console.log(roadId)
    console.log(world.getRoads())
    console.log(road)
    if (typeof road === "number") return;
    console.log(7)
    world.addVehicle(road, direction, speed, (direction ? 0 : road.getLength() - 1.5));
    console.log("added vehicle")
    console.log(road.getVehicles())
  }
</script>
<Renderer {world} {topLeft} bind:scale={scale} {screenW} {screenH}/>
<div>
  {#if creatingRoad}
    <RoadCreator addRoad={addRoad}/>
  {/if}
  {#if !creatingRoad} 
    <button on:click={()=>{creatingRoad = true;}}>Open Create Road Menu</button>
  {/if}
</div>

<div>
  <button on:click={() => {creatingVehicle = true;}}>Start Creating Vehicle</button>
</div>

{#if creatingVehicle}

  <div>
    <VehicleCreator world={world} addVehicle={addVehicle}/>
  </div>

{/if}