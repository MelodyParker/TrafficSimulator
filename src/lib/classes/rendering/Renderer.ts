import type World from "../representations/World";
import Road from "../representations/Road";


type TentativeRoadParams = {
  isHorizontal: boolean,
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

    this.ctx.fillStyle = "#f00";

    if (isHorizontal) {
      this.ctx.fillRect(topLeft[0], topLeft[1], roadLength*this.scale, roadWidth*this.scale);
    } else {
      this.ctx.fillRect(topLeft[0], topLeft[1], roadWidth*this.scale, roadLength*this.scale);
    }

  }

  

  render(): void {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.width, this.height)
    for (let road of this.world.getRoads()) {
      this.drawRoad(road);
    }
  }


  renderTentativeRoad(tentativeRoadParams: TentativeRoadParams) {

    let fakeRoad: Road = new Road(this.world, tentativeRoadParams.isHorizontal, tentativeRoadParams.roadLength, tentativeRoadParams.roadStartPos)
    this.drawRoad(fakeRoad);
  }
}