export function distance(acceleration: number, velocity: number, time: number): number {
  return 0.5 * acceleration * time * time + velocity * time;
}

export function timeToStop(velocity: number, acceleration: number): number {
  return (velocity / acceleration);
}

export function accelerationToStopInDistance(velocity: number, distance: number): number {
  return -Math.sign(velocity) * (3/2 * velocity * velocity) / Math.abs(distance);
}

export function distanceToStop(velocity: number, acceleration: number): number {
  return Math.abs(3/2 * velocity * velocity / acceleration);
}