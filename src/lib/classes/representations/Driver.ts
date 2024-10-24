import World from "./World";
import { highestIds } from "$lib/misc/stores";
import type Vehicle from "./Vehicle";



export default class Driver {
  vehicle: Vehicle;
  desiredFollowingDistance: number = 4.5;
  maxAcceleration: number;
  
  constructor(vehicle: Vehicle) {
    this.vehicle = vehicle;
    this.maxAcceleration = vehicle.maxAcceleration;
    
  }

  update(dt: number): void {
    // update method here
  }
}