export default class Personality {
  desiredFollowingDistance: number; // the distance (in world coordinates) between this driver's vehicle and the vehicle in front of it
  desiredBrakingAcceleration: number; // the acceleration this driver would like to apply when braking
  desiredStoppingDistance: number; // the distance behind the next vehicle that this driver would like to stop
  desiredSpeedOverLimit: number; // how much faster than the speed limit the driver wants to go
  desiredAcceleratingAcceleration: number;

  constructor(desiredFollowingDistance: number, desiredBrakingAcceleration: number, desiredStoppingDistance: number, desiredSpeedOverLimit: number, desiredAcceleratingAcceleration: number) {
    this.desiredFollowingDistance = desiredFollowingDistance;
    this.desiredBrakingAcceleration = desiredBrakingAcceleration;
    this.desiredStoppingDistance = desiredStoppingDistance;
    this.desiredSpeedOverLimit = desiredSpeedOverLimit;
    this.desiredAcceleratingAcceleration = desiredAcceleratingAcceleration;
  }
}