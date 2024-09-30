import { highestIds } from "$lib/misc/stores";
export default class Intersection {
  id: number = 0;

  constructor() {
    highestIds.update((currentValue) => {
      this.id = currentValue.intersection;
      currentValue.intersection ++;
      return currentValue;
    })


  }
  getId(): number {
    return this.id;
  }
}