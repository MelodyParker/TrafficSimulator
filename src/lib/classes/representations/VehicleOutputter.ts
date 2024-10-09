import type Road from "./Road";
import type World from "./World";

export default class VehicleOutputter {
  world: World;
  road: Road;
  posOnRoad: number;
  rate: number;
  directionOfOutput: boolean;
  startingVelocity: number;

  constructor(world: World, road:Road, posOnRoad: number, directionOnRoad: boolean, rate: number, startingVelocity: number) { 
    // rate measured in average cars per second
    this.world = world;
    this.road = road;
    this.posOnRoad = posOnRoad;
    this.rate = rate;
    this.directionOfOutput = directionOnRoad;
    this.startingVelocity = startingVelocity;
  }

  update(dt: number): void {
    let probabilityOfGeneratingCar = dt * this.rate;
    if (Math.random() > probabilityOfGeneratingCar)
      this.world.addVehicle(this.road, this.directionOfOutput, this.startingVelocity, this.posOnRoad);
  }
}