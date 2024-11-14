import type World from "../representations/World";
import Road from "../representations/Road";
import type Vehicle from "../representations/Vehicle";


type TentativeRoadParams = {
  roadIsHorizontal: boolean,
  roadLength: number,
  roadStartPos: number[]
  
}
export default class Renderer {
  ctx: CanvasRenderingContext2D;
  world: World;
  topLeft: number[];
  scale: number;
  width: number;
  height: number;

  constructor(ctx: CanvasRenderingContext2D, world: World, topLeft: number[], scale: number, width: number, height: number) {
    this.ctx = ctx;
    this.world = world;
    this.topLeft = topLeft;
    this.scale = scale;
    this.width = width;
    this.height = height;
  }

  worldPosToPixelPos(worldPos: number[]): number[] {
    return [this.scale * (worldPos[0] - this.topLeft[0]), this.scale * (worldPos[1] - this.topLeft[1])];
  }

  drawRoad(roadToDraw: Road): void {

    let topLeft = this.worldPosToPixelPos(roadToDraw.posFromDistance(0));
    let roadWidth = roadToDraw.getWidth();
    let roadLength = roadToDraw.getLength();

    let isHorizontal = roadToDraw.isHorizontal;

    this.ctx.fillStyle = "#333";

    if (isHorizontal) {
      this.ctx.fillRect(topLeft[0], topLeft[1], roadLength*this.scale, roadWidth*this.scale);
    } else {
      this.ctx.fillRect(topLeft[0], topLeft[1], roadWidth*this.scale, roadLength*this.scale);
    }
    for (let vehicle of roadToDraw.getVehicles()) {
      this.drawVehicle(vehicle);
    }
  }

  drawVehicle(vehicle: Vehicle) {
    // since Americans drive on the right, should be rendered on the bottom
    // when moving right(+ direction), should be rendered on the top when
    // moving left(- direction), should be rendered on the right when moving
    // up (- direction), should be rendered on the left when moving down (+ direction)

    let [vehiclePosX, vehiclePosY]: number[] = vehicle.getPosition();
    let vehicleWidth = 1.5;
    let vehicleHeight = 1.5;
    let directionOnRoad: boolean = vehicle.getDirectionOnRoad();
    let road: Road = vehicle.getRoad();
    let roadIsHorizontal: boolean = road.isHorizontal;
    if (roadIsHorizontal) {
      vehicleHeight = road.getLaneWidth();
      if (directionOnRoad) {
        vehiclePosY += road.lanesBackward * road.getLaneWidth();
        vehicleWidth = Math.min(road.posFromDistance(road.getLength())[0] - vehiclePosX, vehicleWidth)
      }
      else if (vehiclePosX < road.posFromDistance(0)[0]) {
        vehicleWidth = vehicleWidth - (road.posFromDistance(0)[0] - vehiclePosX);
        vehiclePosX = road.posFromDistance(0)[0];
      }
    } else {
      vehicleWidth = road.getLaneWidth();
      if (!directionOnRoad) {
        vehiclePosX += road.lanesBackward * road.getLaneWidth();

        if (vehiclePosY < road.posFromDistance(0)[1]) {
          vehicleHeight = vehicleHeight - (road.posFromDistance(0)[1] - vehiclePosY);

          vehiclePosY = Math.max(road.posFromDistance(0)[1], vehiclePosY);
        }
      } else {
          vehicleHeight = Math.min(road.posFromDistance(road.getLength())[1] - vehiclePosY, vehicleHeight);
      }
    }
    this.ctx.fillStyle = "#00678A";
    
    this.ctx.fillRect(this.worldPosToPixelPos([vehiclePosX, vehiclePosY])[0], this.worldPosToPixelPos([vehiclePosX, vehiclePosY])[1], vehicleWidth * this.scale, vehicleHeight * this.scale);
  }

  

  render(): void {
    this.ctx.fillStyle = "#42A509";
    this.ctx.fillRect(0, 0, this.width, this.height)
    for (let road of this.world.getRoads()) {
      this.drawRoad(road);
    }
  }


  renderTentativeRoad(tentativeRoadParams: TentativeRoadParams) {

    let fakeRoad: Road = new Road(this.world, tentativeRoadParams.roadIsHorizontal, tentativeRoadParams.roadLength, tentativeRoadParams.roadStartPos)
    this.drawRoad(fakeRoad);
  }
}