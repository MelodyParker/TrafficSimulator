import Road from "./Road";
import Driver from "./Driver";
import World from "./World";
import { highestIds, vehicleSpecs } from "$lib/misc/stores";
import Personality from "./Personality";



export default class Vehicle {

  id: number = 0;
  currentRoad: Road;
  directionOnRoad: boolean;
  velocityOnRoad: number;
  positionOnRoad: number;
  maxAcceleration: number = 0;
  maxBraking: number = 0;
  driver: Driver;
  world: World;
  personality: Personality;

  constructor(world: World, startingRoad: Road, directionOnRoad: boolean, velocityOnRoad: number, positionOnRoad: number, personality: Personality) {
    highestIds.update((currentValue) => { // a dumb way of reading the current value of highestIds
      this.id = currentValue.vehicle;
      currentValue.vehicle ++;
      return currentValue;
    })
    vehicleSpecs.update((currentValue) => { // a dumb way of reading the current value of vehicleSpecs
      this.maxBraking = currentValue.maxBraking;
      this.maxAcceleration = currentValue.maxAcceleration;
      return currentValue;
    })
    this.world = world;
    this.currentRoad = startingRoad;
    this.directionOnRoad = directionOnRoad;
    this.velocityOnRoad = (directionOnRoad ? velocityOnRoad : -velocityOnRoad);
    this.positionOnRoad = positionOnRoad;
    this.personality = personality;
    this.driver = new Driver(this, this.personality);
  }

  getId(): number {
    return this.id;
  }

  setRoad(road: Road, directionOnRoad: boolean, velocityOnRoad: number): void {
    this.currentRoad.removeVehicle(this.id);
    this.currentRoad = road;
    this.currentRoad.addVehicle(this);

    
  }

  getPosition(): number[] {
    return this.currentRoad.posFromDistance(this.positionOnRoad);
  }

  getDirectionOnRoad(): boolean {
    return this.directionOnRoad;
  }

  getRoad(): Road {
    return this.currentRoad;
  }

  accelerate(acceleration: number) {
    this.velocityOnRoad += acceleration;
  }

  update(dt: number): void|number {
    this.positionOnRoad += this.velocityOnRoad * dt;
    if ((this.positionOnRoad > this.currentRoad.getLength() && this.directionOnRoad) || (!this.directionOnRoad && this.positionOnRoad + 1.5 < 0)) {
      this.world.removeVehicle(this.id);
    }
    this.driver.update(dt);
  }


}