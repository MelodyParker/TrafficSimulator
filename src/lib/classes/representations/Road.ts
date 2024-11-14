import Vehicle from "./Vehicle";
import World from "./World";
import { highestIds, roadParams } from "$lib/misc/stores";

export default class Road {
  id: number = 0;
  world: World;
  vehiclesOnRoad: Vehicle[] = [];
  isHorizontal: boolean;
  length: number;
  roadStart: number[];
  lanesForward: number;
  lanesBackward: number;
  laneWidth: number = 1;
  speedLimit: number = 10;
  
  constructor(world: World, isHorizontal: boolean, length: number, roadStartPos: number[], lanesForward=1, lanesBackward=1) {
    this.world = world;
    this.isHorizontal = isHorizontal;
    this.length = length;
    this.roadStart = roadStartPos;
    this.lanesBackward = lanesBackward;
    this.lanesForward = lanesForward;


    highestIds.update((currentValue) => {
      this.id = currentValue.road;
      currentValue.road ++;
      return currentValue;
    })

    roadParams.update((currentValue) => {
      this.laneWidth = currentValue.laneWidth;
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
    if (this.isHorizontal) {
      return [this.roadStart[0] + distanceOnRoad, this.roadStart[1]];
    }
    return [this.roadStart[0], this.roadStart[1] + distanceOnRoad];
  }

  update(dt: number): void {
    for (let vehicle of this.vehiclesOnRoad) {
      vehicle.update(dt);
    }
  }

  getWidth(): number {
    return (this.lanesBackward + this.lanesForward) * this.laneWidth;
  }

  getLaneWidth(): number {
    return this.laneWidth;
  }

  getLength(): number {
    return this.length;
  }
  
  getVehicles(): Vehicle[] {
    return this.vehiclesOnRoad;
  }


}
