import type Road from "./Road";
import type World from "./World";


export default class VehicleOutputter {
  world: World;
  road: Road;
  posOnRoad: number;
  rate: number;
  directionOfOutput: boolean;
  startingVelocity: number;
  minBetweenOutputs: number;
  timeSinceLastOutput: number = Number.MAX_VALUE;

  constructor(world: World, road:Road, posOnRoad: number, directionOnRoad: boolean, rateOfOutput: number, startingVelocity: number, minBetweenOutputs: number = 0) { 
    // rate measured in average cars per second
    this.world = world;
    this.road = road;
    this.posOnRoad = posOnRoad;
    this.rate = rateOfOutput;
    this.directionOfOutput = directionOnRoad;
    this.startingVelocity = startingVelocity;
    this.minBetweenOutputs = minBetweenOutputs;
  }

  update(dt: number): void {
    let probabilityOfGeneratingCar = dt * this.rate;
    if (Math.random() < probabilityOfGeneratingCar && this.timeSinceLastOutput >= this.minBetweenOutputs) {
      this.world.addVehicle(this.road, this.directionOfOutput, this.startingVelocity, this.posOnRoad);
      this.timeSinceLastOutput = 0;
    }
    else {
      this.timeSinceLastOutput += dt;
    }
  }
}