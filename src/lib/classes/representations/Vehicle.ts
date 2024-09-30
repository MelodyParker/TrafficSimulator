import Road from "./Road";
import Driver from "./Driver";
import World from "./World";
import { highestIds, vehicleSpecs } from "$lib/misc/stores";



export default class Vehicle {

  id: number = 0;
  currentRoad: Road;
  directionOnRoad: boolean;
  velocityOnRoad: number;
  positionOnRoad: number;
  maxAcceleration: number = 0;
  maxBraking: number = 0;
  driver: Driver = new Driver(this);

  constructor(world: World, startingRoad: Road, directionOnRoad: boolean, velocityOnRoad: number, positionOnRoad: number) {
    highestIds.update((currentValue) => {
      this.id = currentValue.vehicle;
      currentValue.vehicle ++;
      return currentValue;
    })
    vehicleSpecs.update((currentValue) => {
      this.maxBraking = currentValue.maxBraking;
      this.maxAcceleration = currentValue.maxAcceleration;
      return currentValue;
    })

    this.currentRoad = startingRoad;
    this.directionOnRoad = directionOnRoad;
    this.velocityOnRoad = velocityOnRoad;
    this.positionOnRoad = positionOnRoad;

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
}