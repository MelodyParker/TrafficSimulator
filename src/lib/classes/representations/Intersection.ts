import { highestIds } from "$lib/misc/stores";
import type Road from "./Road";
export default class Intersection {
  id: number = 0;
  horizRoad: Road;
  vertRoad: Road;

  constructor(road1: Road, road2: Road) {
    highestIds.update((currentValue) => { // a dumb way of reading the current value of highestIds
      this.id = currentValue.intersection;
      currentValue.intersection ++;
      return currentValue;
    })


    if (!road1.intersectsWith(road2)) throw Error("An Intersection cannot be created with non-intersecting Roads.")
    
    if (road1.isHorizontal) {
      this.horizRoad = road1;
      this.vertRoad = road2;
    } else {
      this.vertRoad = road1;
      this.horizRoad = road2;
    }
  


  }
  getId(): number {
    return this.id;
  }

  update(dt: number): void {
    // eventually need to put something here
  }
}