import type Vehicle from "./Vehicle";
import type Personality from "./Personality";
import type World from "./World";
import type Task from "../Task";


export default class Driver {
  vehicle: Vehicle;
  desiredFollowingDistance: number = 4.5;
  maxAcceleration: number;
  personality: Personality;
  world: World;
  currentAcceleration: number = 0;
  currentTasks: Task[] = [];

  
  constructor(vehicle: Vehicle, personality: Personality) {
    this.vehicle = vehicle;
    this.maxAcceleration = vehicle.maxAcceleration;
    this.personality = personality;
    this.world = this.vehicle.world;
    
  }

  update(dt: number): void {
    // for (let i = this.currentTasks.length - 1; i >= 0; i--) {
    //   let task = this.currentTasks[i];
    //   if (task.isCompleted())
    //     this.currentTasks.splice(i, 1);
    // }
    // for (let task of this.currentTasks) {
    //   this.advanceTask(task, dt);
    // }
    this.vehicle.velocityOnRoad = Math.sign(this.vehicle.velocityOnRoad) * this.intendedVelocity();
  }

  advanceTask(task: Task, dt: number): void {
    switch (task.name) {
      case "STOP":
        this.vehicle.accelerate(task.params.acceleration * dt);
        if (this.vehicle.velocityOnRoad <= 0) task.completeTask();
        break;
      case "CHANGE_SPEED":
        if (!("desiredSpeed" in task.params)) return
        this.vehicle.accelerate(task.params.acceleration * dt);
        if (task.params.acceleration > 0 && this.vehicle.velocityOnRoad >= task.params.desiredSpeed || task.params.acceleration < 0 && this.vehicle.velocityOnRoad <= task.params.desiredSpeed)
          task.completeTask();
    }
  }

  nextVehicle() {
    return this.vehicle.nextVehicle();
  }

  distanceToNextVehicle() {
    return this.vehicle.distanceToNextVehicle();
  }

  intendedVelocity() {
    let dist = this.distanceToNextVehicle();
    let following_distance = this.personality.desiredFollowingDistance;
    let desired_velocity = this.personality.desiredSpeedOverLimit + this.vehicle.getRoad().speedLimit;

    if (dist >= following_distance) return desired_velocity;
    let nextV = this.nextVehicle()
    if (nextV)
      return Math.min(Math.abs(nextV.velocityOnRoad), Math.abs((dist - following_distance) * desired_velocity / following_distance + desired_velocity));
  }
}