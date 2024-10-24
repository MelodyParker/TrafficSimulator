import { highestIds } from "$lib/misc/stores";
import Intersection from "./Intersection";
import type Personality from "./Personality";
import Road from "./Road";
import Vehicle from "./Vehicle";
import VehicleOutputter from "./VehicleOutputter";


export default class World {
  activeRoads: Road[] = [];
  activeVehicles: Vehicle[] = [];
  activeIntersections: Intersection[] = [];
  activeVehicleOutputters: VehicleOutputter[] = [];
  id: number = 0;

  constructor() {
    highestIds.update((currentValue) => {
      this.id = currentValue.world;
      currentValue.world ++;
      return currentValue;
    })

  }

  getVehicles(): Vehicle[] {
    return this.activeVehicles;
  }

  getRoads(): Road[] {
    return this.activeRoads;
  }

  getIntersections(): Intersection[] {
    return this.activeIntersections;
  }

  update(dt: number): void {
    for (let vehicleOutputter of this.activeVehicleOutputters) {
      vehicleOutputter.update(dt);
    }

    for (let road of this.activeRoads) {
      road.update(dt); // also updates all cars on the road
    }

    for (let intersection of this.activeIntersections) {
      intersection.update(dt);
    }

  }

  addVehicle(startingRoad: Road, directionOnRoad: boolean, velocityOnRoad: number, positionOnRoad: number, personality: Personality): Vehicle {
    let vehicleToAdd: Vehicle = new Vehicle(this, startingRoad, directionOnRoad, velocityOnRoad, positionOnRoad, personality)
    this.activeVehicles.push(vehicleToAdd);
    startingRoad.addVehicle(vehicleToAdd);
    return vehicleToAdd;
  }
  
  removeVehicle(roadId: number) {

    for (let i=0; i<this.activeVehicles.length; i++) {
      let maybeRemovingVehicle = this.activeVehicles[i];
      if (maybeRemovingVehicle.id === roadId) {
        this.activeVehicles.splice(i, 1);
        maybeRemovingVehicle.getRoad().removeVehicle(maybeRemovingVehicle.id);
      }
    }
  }

  addRoad(isHorizontal: boolean, length: number, roadStartPos: number[], lanesForward=undefined, lanesBackward=undefined): Road {
    let roadToAdd: Road = new Road(this, isHorizontal, length, roadStartPos, lanesForward, lanesBackward);
    this.activeRoads.push(roadToAdd);
    return roadToAdd;
  }

  removeRoad(roadId: number) {
    for (let i=0; i<this.activeRoads.length; i++) {
      if (this.activeRoads[i].id === roadId) 
        this.activeRoads.splice(i, 1);
    }
  }

  addIntersection(): Intersection {
    let intersectionToAdd = new Intersection();
    this.activeIntersections.push(intersectionToAdd);
    return intersectionToAdd;
  }

  addVehicleOutputter(world: World, road:Road, posOnRoad: number, directionOnRoad: boolean, rateOfOutput: number, startingVelocity: number, minBetweenOutputs: number = 0): void {
    this.activeVehicleOutputters.push(new VehicleOutputter(this, road, posOnRoad, directionOnRoad, rateOfOutput, startingVelocity, minBetweenOutputs));
  }

  getVehicleById(id: number): Vehicle | number {
    this.activeVehicles.forEach(vehicle => {
      if (vehicle.getId() === id) return vehicle;
    });
    return -1;
  }

   getRoadById(id: number): Road | number {
    return this.activeRoads.filter(road => road.id == id)[0];
    // this.activeRoads.forEach(road => {
    //   console.log(road)
    //   if (road.getId() === id) return road;
    // });
    // return -1;
  } 

  getIntersectionById(id: number): Intersection | number {
    this.activeIntersections.forEach(intersection => {
      if (intersection.getId() === id) return intersection;
    });
    return -1;
  }
}