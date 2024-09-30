import Vehicle from "./Vehicle";
import World from "./World";
import { highestIds } from "$lib/misc/stores";

export default class Road {
  id: number = 0;
  world: World;
  vehiclesOnRoad: Vehicle[] = [];
  
  constructor(world: World) {
    this.world = world;
    highestIds.update((currentValue) => {
      this.id = currentValue.road;
      currentValue.road ++;
      return currentValue;
    })
  }

  addVehicle(vehicle: Vehicle): void {
    this.vehiclesOnRoad.push(vehicle);
  }

  removeVehicle(vehicleId: number): Vehicle | void {
    for (let i=this.vehiclesOnRoad.length-1; i>=0; i--) {
      let vehicle = this.vehiclesOnRoad[i];
      if (vehicle.getId() === vehicleId) this.vehiclesOnRoad.splice(i,1);
    }
  }

  getId(): number {
    return this.id;
  }

  posFromDistance(distanceOnRoad: number): number[] {
    return [50, distanceOnRoad];
  }

  update(dt: number): void {
    for (let vehicle of this.vehiclesOnRoad) {
      vehicle.update(dt);
    }
  }
}

