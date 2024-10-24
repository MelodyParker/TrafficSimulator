<script lang="ts">
	import type World from "$lib/classes/representations/World";

  export let addVehicle: Function;
  export let world: World;
  let roads = world.getRoads();
  $: world, () => {roads = world.getRoads()};


  let movingForward: boolean = false;
  let speed: number = 1;
  
  function submitForm(e: Event) {
    console.log("things")
    const selectedRadioButton = document.querySelector('input[name="road"]:checked');

    if (!selectedRadioButton) 
      return
    
    let roadId: number = parseInt(selectedRadioButton.id);


    addVehicle(roadId, movingForward, speed);
    console.log("added road hopefully")
  }


</script>


<form on:submit|preventDefault={submitForm}>
  <fieldset>
    <legend>Which road would you like to create it on?</legend>
    {#each world.getRoads() as road}
      <input type="radio" name="road" id={(road.getId()).toString()}>
      <label for={(road.getId()).toString()}>{road.getId()}</label>
    {/each}
  </fieldset>
  <div>
    <label for="movingForward">Moving Forward?</label>
    <input type="checkbox" name="movingForward" id="moving-forward" bind:checked={movingForward}>
  </div>
  <div>
    <label for="speed">Speed:</label>
    <input type="number" name="speed" id="speed" bind:value={speed}>
  </div>
  <button type="submit" on:click|preventDefault={submitForm}>Submit form</button>
</form>