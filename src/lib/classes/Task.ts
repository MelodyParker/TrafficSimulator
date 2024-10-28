export default class Task {
  params: Object;
  name: string;
  complete: boolean = false;

  constructor(name:string, params:Object) {
    this.params = params;
    this.name = name;
  }

  completeTask(): void {
    this.complete = true;
  }
}