import type { StopParams } from "$lib/misc/types";
import type { ChangeSpeedParams } from "$lib/misc/types";
export default class Task {

  params: StopParams|ChangeSpeedParams;
  name: string;
  complete: boolean = false;

  constructor(name:string, params:StopParams|ChangeSpeedParams) {
    this.params = params;
    this.name = name;
  }

  completeTask(): void {
    this.complete = true;
  }

  isCompleted(): boolean {
    return this.complete;
  }
}