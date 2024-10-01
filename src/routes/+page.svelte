<script lang="ts">
  import Renderer from "$lib/components/Renderer.svelte";
  import World from "$lib/classes/representations/World";
	import Vehicle from "$lib/classes/representations/Vehicle";
	import Road from "$lib/classes/representations/Road";
  let bool:boolean = true;
  let world: World = new World();
  let mainRoad: Road = world.addRoad(true, 20, [5, 5]);
  let vehicle1: Vehicle = world.addVehicle(mainRoad, true, 1, 0);
  let scale: number = 50;
  let topLeft: number[] = [0, 0];
</script>

<Renderer {world} {topLeft} {scale}/>