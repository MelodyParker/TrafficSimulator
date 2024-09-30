<script lang="ts">
  import Renderer from "$lib/components/Renderer.svelte";
  import World from "$lib/classes/representations/World";
	import Vehicle from "$lib/classes/representations/Vehicle";
	import Road from "$lib/classes/representations/Road";
  let bool:boolean = true;
  let world: World = new World();
  let mainRoad: Road = world.addRoad();
  let vehicle1 = world.addVehicle(mainRoad.getId(), true, 1, 0);
</script>

<Renderer {world} />