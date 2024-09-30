import { readable, writable } from 'svelte/store';
export const highestIds = writable({
  road: 1,
  vehicle: 1,
  world: 1,
  driver: 1,
  intersection: 1
})

export const vehicleSpecs = writable({
  maxAcceleration: 1,
  maxBraking: 10
})
