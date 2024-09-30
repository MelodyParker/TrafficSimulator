import World from "./World";
import { highestIds } from "$lib/misc/stores";
import type Vehicle from "./Vehicle";



export default class Driver {
  vehicle: Vehicle;
  
  constructor(vehicle: Vehicle) {
    this.vehicle = vehicle;
    
  }

  update(dt: number): void {
    // update method here
  }
}