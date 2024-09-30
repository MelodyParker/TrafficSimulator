import { highestIds } from "$lib/misc/stores";
import Intersection from "./Intersection";
import Road from "./Road";
import Vehicle from "./Vehicle";


export default class World {
  activeRoads: Road[] = [];
  activeVehicles: Vehicle[] = [];
  activeIntersections: Intersection[] = [];
  id: number = 0;

  constructor() {
    highestIds.update((currentValue) => {
      this.id = currentValue.world;
      currentValue.world ++;
      return currentValue;
    })

  }

  update(dt: number): void {

  }

  addVehicle(startingRoad: Road, directionOnRoad: boolean, velocityOnRoad: number, positionOnRoad: number): Vehicle {
    let vehicleToAdd: Vehicle = new Vehicle(this, startingRoad, directionOnRoad, velocityOnRoad, positionOnRoad)
    this.activeVehicles.push(vehicleToAdd);
    return vehicleToAdd;
  }

  addRoad(): Road {
    let roadToAdd: Road = new Road(this);
    this.activeRoads.push(roadToAdd);
    return roadToAdd;
  }

  addIntersection(): Intersection {
    let intersectionToAdd = new Intersection();
    this.activeIntersections.push(intersectionToAdd);
    return intersectionToAdd;
  }

  getVehicleById(id: number): Vehicle | number {
    this.activeVehicles.forEach(vehicle => {
      if (vehicle.getId() === id) return vehicle;
    });
    return -1;
  }

   getRoadById(id: number): Road | number {
    this.activeRoads.forEach(road => {
      if (road.getId() === id) return road;
    });
    return -1;
  } 

  getIntersectionById(id: number): Intersection | number {
    this.activeIntersections.forEach(intersection => {
      if (intersection.getId() === id) return intersection;
    });
    return -1;
  }
}