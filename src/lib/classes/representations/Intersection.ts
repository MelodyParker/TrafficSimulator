import { highestIds } from "$lib/misc/stores";
export default class Intersection {
  id: number = 0;

  constructor() {
    highestIds.update((currentValue) => { // a dumb way of reading the current value of highestIds
      this.id = currentValue.intersection;
      currentValue.intersection ++;
      return currentValue;
    })


  }
  getId(): number {
    return this.id;
  }

  update(dt: number): void {
    // eventually need to put something here
  }
}