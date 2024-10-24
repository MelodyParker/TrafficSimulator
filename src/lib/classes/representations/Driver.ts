import World from "./World";
import { highestIds } from "$lib/misc/stores";
import type Vehicle from "./Vehicle";
import type Personality from "./Personality";



export default class Driver {
  vehicle: Vehicle;
  desiredFollowingDistance: number = 4.5;
  maxAcceleration: number;
  personality: Personality;

  
  constructor(vehicle: Vehicle, personality: Personality) {
    this.vehicle = vehicle;
    this.maxAcceleration = vehicle.maxAcceleration;
    this.personality = personality;
    
  }

  update(dt: number): void {
    // update method here
  }
}